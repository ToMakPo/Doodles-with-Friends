require("dotenv").config();
const express = require("express")
const mongoose = require("mongoose")
const apiRoutes = require("./routes")
const PORT = process.env.PORT || 3001
const db = require('./models');
const wordBank = require('./lib/wordBank')

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const passport = require("passport");
app.use(passport.initialize());
// Passport config
passport.use(require("./config/jwtPassportStrategy"));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
} else {
    app.use(express.static("public"))
}
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/doodle_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

// routes
app.use("/api", require("./routes/authentication"));
app.use(apiRoutes)

const server = app.listen(PORT, () => {
    console.info(`App running on http://localhost:${PORT}`)
})

/// SOCKET.IO ///
const socket = require('socket.io');
const io = socket(server)

io.on('connection', newConnection)

function newConnection(socket) {
    console.info('new connection:', socket.id)

    socket.on('addPlayer', addPlayer)
    socket.on('updateRotations', updateRotations)
    socket.on('updateCategory', updateCategory)
    socket.on('buildGame', buildGame)
    socket.on('submitChat', submitChat)
    socket.on('timedOut', timedOut)
    socket.on('playAgain', playAgain)

    /// CANVAS ///
    socket.on('changeColor', (code, color) => {
        // console.log('changeColor:', {code, color})
        socket.broadcast.emit(`${code}-changeColor`, color)
    })
    socket.on('changeSize', (code, size) => {
        // console.log('changeSize:', {code, size})
        socket.broadcast.emit(`${code}-changeSize`, size)
    })
    socket.on('clearDrawing', (code) => {
        // console.log('clearDrawing:', {code})
        socket.broadcast.emit(`${code}-clearDrawing`)
    })
    socket.on('startLine', (code, thisPoint) => {
        // console.log('startLine:', {code, thisPoint})
        socket.broadcast.emit(`${code}-startLine`, thisPoint)
    })
    socket.on('drawLine', (code, thisPoint) => {
        // console.log('drawLine:', {code, thisPoint})
        socket.broadcast.emit(`${code}-drawLine`, thisPoint)
    })
    socket.on('endLine', (code) => {
        // console.log('endLine:', {code})
        socket.broadcast.emit(`${code}-endLine`)
    })
    socket.on('changeTool', (code, toolName) => {
        // console.log('changeTool:', {code, toolName})
        socket.broadcast.emit(`${code}-changeTool`, toolName)
    })

    /// FUNCTIONS ///
    async function submitChat(code, data) {
        const lobby = await db.Lobby.findOne({ code })
        const type = data.messageType

        if (type === 'guess') {
            const round = getActiveRound(lobby)
            const answer = round?.answer?.toLowerCase() || ''
            const guess = data.text.toLowerCase()
            const artist = round?.artist || null
            const sender = data.userId

            if (sender != artist) {
                await lobby.update({$push: {chatLog: data}})

                if (guess == answer) {
                    const answerMessage = {
                        ...data,
                        messageType: 'answer',
                        text: round?.answer
                    }
                    await lobby.update({$push: {chatLog: answerMessage}, })
                    await updataChatLog(code)
                    round.winner = sender
                    lobby.save()
                    endRound(code)
                } else {
                    await updataChatLog(code)
                }
            }
        } else {
            await lobby.update({$push: {chatLog: data}})
            await updataChatLog(code)
        }
    }

    async function timedOut(code) {
        const lobby = await db.Lobby.findOne({ code })
        const round = getActiveRound(lobby)
        const timedOutMessage = {
            messageType: 'timedOut',
            text: round?.answer
        }
        await lobby.update({$push: {chatLog: timedOutMessage}})
        await updataChatLog(code)
        endRound(code, null)
    }

    async function updataChatLog(code) {
        db.Lobby
            .findOne({ code })
            .then(lobby => {
                 // console.log('lobby:', lobby)
                io.emit(`${code}-updataChatLog`, lobby.chatLog)
            })
    }

    function endRound(code) {
        io.emit(`${code}-clearDrawing`)
        startNextRound(code)
    }

    function addPlayer(code, id) {
        db.Lobby.findOneAndUpdate(
            { code },
            { $addToSet: { players: id }}
        ).then(({_id}) => {
            db.Lobby
                .findById(_id)
                .populate('players')
                .then(lobby => {
                    io.emit(`${code}-setPlayers`, 
                        lobby.players.map(({_id, username}) => {
                            const id = _id.toString()
                            const host = lobby.host.toString()
                            const isHost = id === host
                            return {id, username, isHost}
                        }))
                })
        })
    }

    function updateRotations(code, rotations) {
        db.Lobby.findOne({ code })
            .then(lobby => {
                lobby.rules.rotations = rotations
                lobby.save()
                io.emit(`${code}-setRotations`, rotations)
            })
    }

    function updateCategory(code, category) {
        db.Lobby.findOne({ code })
            .then(lobby => {
                lobby.rules.category = category
                lobby.save()
                io.emit(`${code}-setCategory`, category)
            })
    }

    async function buildGame(code, rotations, category) {
        db.Lobby.findOne({ code })
            .then(async lobby => {
                const wordList = wordBank.getCategory(category)
                const players = randomizePlayerOrder(lobby)
                const answer = getRandomWord(wordList)

                const game = {
                    rotations,
                    category,
                    wordList,
                    rounds: [{
                        answer,
                        artist: players[0],
                        winner: null
                    }],
                    players,
                    playerIndex: 0,
                    currentRotation: 0,
                    winner: null
                }

                const artist = await db.User.findById(players[0])

                const newGameMessage = {
                    messageType: 'newGame',
                    text: artist.username
                }
                await lobby.update({$push: {chatLog: newGameMessage}})
                

                db.Lobby
                    .findById(lobby._id)
                    .update({$push: {games: game}})
                    .then(_ => io.emit(`${code}-startGame`))
            })
    }
    
    function playAgain(code){
        io.emit(`${code}-goToWaitingRoom`)
    }

    function getActiveGame(lobby) {
        const index = (lobby?.games?.length || 0) - 1
        return index > -1 ? lobby.games[index] : null
    }

    function getActiveRound(lobby) {
        const game = getActiveGame(lobby)
        const index = (game?.rounds?.length || 0) - 1
        return index > -1 ? game.rounds[index] : null
    }

    function randomizePlayerOrder(lobby) {
        const oldList = [...lobby.players]
        const newList = []

        while (oldList.length > 0) {
            const len = oldList.length
            const randomIndex = Math.floor(Math.random() * len - 1)
            const randomPlayer = oldList.splice(randomIndex, 1)
            newList.push(randomPlayer)
        }

        return newList
    }

    function getRandomWord(wordList) {
        const rand = Math.floor(Math.random() * wordList.length)
        const word = wordList.splice(rand, 1)[0]
        return word
    }

    async function startNextRound(code) {
        let lobby = await db.Lobby.findOne({ code })
        const game = getActiveGame(lobby)
        const count = game.players.length
        // console.log('---------------')
        
         // console.log('playerIndex:', game.playerIndex)
        game.playerIndex++
        // console.log('playerIndex:', game.playerIndex)
        // console.log('count:', count)
        
        // console.log('playerIndex == count:', game.playerIndex == count)
        if (game.playerIndex == count) {
            game.playerIndex = 0
            // console.log('playerIndex:', game.playerIndex)
            // console.log('currentRotation:', game.currentRotation)
            game.currentRotation++
            // console.log('currentRotation:', game.currentRotation)
            // console.log('rotations:', game.rotations)
            // console.log('currentRotation == rotations:', game.currentRotation == game.rotations)
            // await game.update({$set: {currentRotation: game.currentRotation}})
            if (game.currentRotation == game.rotations) {
                /// The game is over. Do not move to next round.
                // console.log('ENDING GAME')
                return endGame(lobby, game)
            }
        }
        // await db.Lobby.update({
        //     '_id': lobby._id,
        //     'child.id': game._id
        // }, {
        //     $inc: {playerIndex: game.playerIndex}
        // })

        const round = {
            answer: getRandomWord(game.wordList),
            artist: game.players[game.playerIndex],
            winner: null
        }
        // console.log('round:', round)

        game.rounds.push(round)
        // await game.update({$push: {rounds: round}})

        const artist = await db.User.findById(game.players[0])
         // console.log('artist:', artist)

        const newRoundMessage = {
            messageType: 'newRound',
            text: artist.username
        }
         // console.log('newRoundMessage:', newRoundMessage)
        lobby.chatLog.push(newRoundMessage)

         // console.log('lobby:', lobby)
        lobby = await lobby.save()

        await updataChatLog(code)
         // console.log('lobby:', lobby)
        
        io.emit(`${code}-startNextRound`, game, round)
    }

    async function endGame(lobby, game) {
        let results = game.players.map(player => {
            return {
                playerId: player,
                username: '',
                score: 0
            }
        })

        // console.log('GOING IN')
        game.rounds.forEach(round => {
            const artist = round.artist.toString()
            const winner = round.winner?.toString() || null
            // console.log('round:', {artist, winner})

            if (winner !== null) {
                for (const result of results) {
                    const playerId = result.playerId.toString()

                    // console.log('result:', result)
                    // console.log('playerId == artist:', result.playerId == artist)
                    // console.log('playerId == winner:', result.playerId == winner)
                    if (result.playerId == artist || result.playerId == winner) {
                        // console.log('score:', result.score)
                        result.score++
                        // console.log('score:', result.score)
                        // console.log('result:', result)
                    }
                }
            }
        })
        // console.log('results:', results)
        
        results = results.sort((a, b) => b.score - a.score)

        const lastRank = {
            score: 999,
            rank: 0
        }

        // await results.forEach(async (result, i) => {
        await asyncForEach(results, async (result, i) => {
            const player = await db.User.findById(result.playerId)

            const rank = result.score === lastRank.score ? lastRank.rank : (i + 1)
            lastRank.score = result.score
            lastRank.rank = rank

            result.username = player.username
            result.rank = rank

            player.gamesPlayed += 1
            player.gamesWon += i == 0 ? 1 : 0
            player.totalPoints += result.score
            player.save()
        })

        game.winner = results[0].playerId
        game.results = results

        lobby.save()

        io.emit(`${lobby.code}-endGame`)
    }

    async function asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }

    // socket.on('setColor', (code, color) => {
    //     io.emit(`${code}-setColor`, color)
    // })
    // socket.on('setSize', (code, size) => {
    //     io.emit(`${code}-setSize`, size)
    // })
    // socket.on('startLine', (code, x, y) => {
    //     io.emit(`${code}-startLine`, x, y)
    // })
    // socket.on('drawLine', (code, x, y) => {
    //     io.emit(`${code}-drawLine`, x, y)
    // })
    // socket.on('endLine', (code) => {
    //     io.emit(`${code}-endLine`)
    // })
    // socket.on('clearDrawing', (code) => {
    //     io.emit(`${code}-clearDrawing`)
    // })
    // socket.on('usePen', (code) => {
    //     io.emit(`${code}-usePen`)
    // })
    // socket.on('useEraser', (code) => {
    //     io.emit(`${code}-useEraser`)
    // })
    // socket.on('logMessage', (code, sender, message) => {
    //     io.emit(`${code}-logMessage`, sender, message)
    // })
    // socket.on('logGuess', (code, sender, guess) => {
    //     io.emit(`${code}-logGuess`, sender, guess)
    //     const answer = 'panda'
    //     if (guess.toLowerCase() === answer) {
    //         io.emit(`${code}-guessIsCorrect`, sender, answer)
    //         //trigger next round
    //     }
    // })
    // socket.on('consoleLog', (code, message) => {
    //     io.emit(`${code}-consoleLog`, message)
    // })
}