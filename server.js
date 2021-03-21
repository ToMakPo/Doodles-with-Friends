require("dotenv").config();
const express = require("express")
const mongoose = require("mongoose")
const apiRoutes = require("./routes")
const PORT = process.env.PORT || 3001

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
    console.log(`App running on http://localhost:${PORT}`)
})

/// SOCKET.IO ///
const socket = require('socket.io')
const io = socket(server)

io.on('connection', newConnection(socket))

function newConnection(socket, io) {
    console.log('new connection:', socket.id)

    socket.on('setColor', (lobbyId, color) => {
        id.emit(`${lobbyId}-setColor`, color)
    })
    socket.on('setSize', (lobbyId, size) => {
        id.emit(`${lobbyId}-setSize`, size)
    })
    socket.on('startLine', (lobbyId, x, y) => {
        id.emit(`${lobbyId}-startLine`, x, y)
    })
    socket.on('drawLine', (lobbyId, x, y) => {
        id.emit(`${lobbyId}-drawLine`, x, y)
    })
    socket.on('endLine', (lobbyId) => {
        id.emit(`${lobbyId}-endLine`)
    })
    socket.on('clearDrawing', (lobbyId) => {
        console.log('sensed clearDrawing');
        id.emit(`${lobbyId}-clearDrawing`)
    })
    socket.on('usePen', (lobbyId) => {
        id.emit(`${lobbyId}-usePen`)
    })
    socket.on('useEraser', (lobbyId) => {
        id.emit(`${lobbyId}-useEraser`)
    })
    socket.on('logMessage', (lobbyId, sender, message) => {
        console.log('game id:', lobbyId);
        id.emit(`${lobbyId}-logMessage`, sender, message)
    })
    socket.on('logGuess', (lobbyId, sender, guess) => {
        id.emit(`${lobbyId}-logGuess`, sender, guess)
        const answer = 'panda'//TODO: lookup answer for this game
        if (guess.toLowerCase() === answer) {
            io.emit(`${lobbyId}-guessIsCorrect`, sender, answer)
            //TODO: trigger next round
        }
    })
    socket.on('consoleLog', (lobbyId, message) => {
        io.emit(`${lobbyId}-consoleLog`, message)
    })
}