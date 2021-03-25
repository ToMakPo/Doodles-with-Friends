require("dotenv").config();
const express = require("express")
const mongoose = require("mongoose")
const apiRoutes = require("./routes")
const PORT = process.env.PORT || 3001
const db = require('./models');

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
const { Lobby } = require("./models");
const io = socket(server)

io.on('connection', newConnection)

function newConnection(socket) {
    console.info('new connection:', socket.id)

    socket.on('addPlayer', addPlayer)
    socket.on('updateRotations', updateRotations)
    socket.on('updateCategory', updateCategory)
    socket.on('startGame', startGame)
    socket.on('playerIsReady', buildGame)

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

    function startGame(code) {
        io.emit(`${code}-triggerStart`)
    }

    function buildGame(code, player, words) {
        db.Lobby.findOne({ code })
            .then(lobby => {
                lobby.rules.category = category
                lobby.save()
                io.emit(`${code}-setCategory`, category)
            })
        io.emit(`${code}-startGame`)
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
    //     console.debug('sensed clearDrawing');
    //     io.emit(`${code}-clearDrawing`)
    // })
    // socket.on('usePen', (code) => {
    //     io.emit(`${code}-usePen`)
    // })
    // socket.on('useEraser', (code) => {
    //     io.emit(`${code}-useEraser`)
    // })
    // socket.on('logMessage', (code, sender, message) => {
    //     console.debug('lobby code:', code);
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