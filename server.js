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
    console.info(`App running on http://localhost:${PORT}`)
})

/// SOCKET.IO ///
// const socket = require('socket.io')
// const io = socket(server)

// io.on('connection', newConnection(socket))

function newConnection(socket, io) {
    // console.info('new connection:', socket.id)

    // socket.on('setColor', (lobbyCode, color) => {
    //     io.emit(`${lobbyCode}-setColor`, color)
    // })
    // socket.on('setSize', (lobbyCode, size) => {
    //     io.emit(`${lobbyCode}-setSize`, size)
    // })
    // socket.on('startLine', (lobbyCode, x, y) => {
    //     io.emit(`${lobbyCode}-startLine`, x, y)
    // })
    // socket.on('drawLine', (lobbyCode, x, y) => {
    //     io.emit(`${lobbyCode}-drawLine`, x, y)
    // })
    // socket.on('endLine', (lobbyCode) => {
    //     io.emit(`${lobbyCode}-endLine`)
    // })
    // socket.on('clearDrawing', (lobbyCode) => {
    //     console.debug('sensed clearDrawing');
    //     io.emit(`${lobbyCode}-clearDrawing`)
    // })
    // socket.on('usePen', (lobbyCode) => {
    //     io.emit(`${lobbyCode}-usePen`)
    // })
    // socket.on('useEraser', (lobbyCode) => {
    //     io.emit(`${lobbyCode}-useEraser`)
    // })
    // socket.on('logMessage', (lobbyCode, sender, message) => {
    //     console.debug('lobby code:', lobbyCode);
    //     io.emit(`${lobbyCode}-logMessage`, sender, message)
    // })
    // socket.on('logGuess', (lobbyCode, sender, guess) => {
    //     io.emit(`${lobbyCode}-logGuess`, sender, guess)
    //     const answer = 'panda'//TODO: lookup answer for this game
    //     if (guess.toLowerCase() === answer) {
    //         io.emit(`${lobbyCode}-guessIsCorrect`, sender, answer)
    //         //TODO: trigger next round
    //     }
    // })
    // socket.on('consoleLog', (lobbyCode, message) => {
    //     io.emit(`${lobbyCode}-consoleLog`, message)
    // })
}