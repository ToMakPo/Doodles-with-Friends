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
                io.emit(`${code}-updataChatLog`, lobby.chatLog)
            })
    }

    function endRound(code) {
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

    function startNextRound(code) {
        db.Lobby.findOne({ code })
            .then(async lobby => {
                const game = getActiveGame(lobby)
                const count = game.players.length
                game.playerIndex++
                if (game.playerIndex == count) {
                    game.playerIndex == 0
                    game.currentRotation++
                    if (game.currentRotation == game.rotations) {
                        /// The game is over. Do not move to next round.
                        return endGame(lobby)
                    }
                }

                const round = {
                    answer: getRandomWord(game.wordList),
                    artist: game.players[game.playerIndex],
                    winner: null
                }
                game.rounds.push(round)

                const artist = await db.User.findById(game.players[0])

                const NewRoundMessage = {
                    messageType: 'newRound',
                    text: artist.username
                }
                lobby.chatLog.push(NewRoundMessage)

                lobby.save()

                await updataChatLog(code)
                
                io.emit(`${code}-startNextRound`, round)
            })
    }

    function endGame(lobby) {
        //TODO: end the game
        io.emit(`${code}-endGame`)
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
    //     const answer = 'panda'//TODO: lookup answer for this game
    //     if (guess.toLowerCase() === answer) {
    //         io.emit(`${code}-guessIsCorrect`, sender, answer)
    //         //TODO: trigger next round
    //     }
    // })
    // socket.on('consoleLog', (code, message) => {
    //     io.emit(`${code}-consoleLog`, message)
    // })
}