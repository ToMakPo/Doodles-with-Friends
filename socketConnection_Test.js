function newConnection(socket, io) {
    console.log('new connection:', socket.id)

    socket.on('setColor', (gameId, color) => {
        socket.broadcast.emit(`${gameId}-setColor`, color)
    })
    socket.on('setSize', (gameId, size) => {
        socket.broadcast.emit(`${gameId}-setSize`, size)
    })
    socket.on('startLine', (gameId, x, y) => {
        socket.broadcast.emit(`${gameId}-startLine`, x, y)
    })
    socket.on('drawLine', (gameId, x, y) => {
        socket.broadcast.emit(`${gameId}-drawLine`, x, y)
    })
    socket.on('endLine', (gameId) => {
        socket.broadcast.emit(`${gameId}-endLine`)
    })
    socket.on('clearDrawing', (gameId) => {
        console.log('sensed clearDrawing');
        socket.broadcast.emit(`${gameId}-clearDrawing`)
    })
    socket.on('usePen', (gameId) => {
        socket.broadcast.emit(`${gameId}-usePen`)
    })
    socket.on('useEraser', (gameId) => {
        socket.broadcast.emit(`${gameId}-useEraser`)
    })
    socket.on('logMessage', (gameId, sender, message) => {
        console.log('game id:', gameId);
        socket.broadcast.emit(`${gameId}-logMessage`, sender, message)
    })
    socket.on('logGuess', (gameId, sender, guess) => {
        socket.broadcast.emit(`${gameId}-logGuess`, sender, guess)
        const answer = 'panda'//TODO: lookup answer for this game
        if (guess.toLowerCase() === answer) {
            io.emit(`${gameId}-guessIsCorrect`, sender, answer)
            //TODO: trigger next round
        }
    })
    socket.on('consoleLog', (gameId, message) => {
        io.emit(`${gameId}-consoleLog`, message)
    })
}

module.exports = newConnection