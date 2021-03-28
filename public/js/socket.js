let socket

function setupSocket(gameId) {
    const path = location.href
    socket = io.connect(path)

    socket.on(`${gameId}-setColor`, setColor)
    socket.on(`${gameId}-setSize`, setSize)
    socket.on(`${gameId}-startLine`, startLine)
    socket.on(`${gameId}-drawLine`, drawLine)
    socket.on(`${gameId}-endLine`, endLine)
    socket.on(`${gameId}-clearDrawing`, clearDrawing)
    socket.on(`${gameId}-usePen`, usePen)
    socket.on(`${gameId}-useEraser`, useEraser)
    socket.on(`${gameId}-logMessage`, logMessage)
    socket.on(`${gameId}-logGuess`, logGuess)
    socket.on(`${gameId}-guessIsCorrect`, logCorrect)
    socket.on(`${gameId}-consoleLog`, message => console.info(...message))
}

const emit = {
    setColor: color => socket.emit('setColor', gameId, color),
    setSize: size => socket.emit('setSize', gameId, size),
    startLine: (x, y) => socket.emit('startLine', gameId, x, y),
    drawLine: (x, y) => socket.emit('drawLine', gameId, x, y),
    endLine: () => socket.emit('endLine', gameId),
    clearDrawing: () => socket.emit('clearDrawing', gameId),
    usePen: () => socket.emit('usePen', gameId),
    useEraser: () => socket.emit('useEraser', gameId),
    logMessage: (sender, message) => socket.emit('logMessage', gameId, sender, message),
    logGuess: (sender, guess) => socket.emit('logGuess', gameId, sender, guess),
    consoleLog: (...message) => socket.emit('consoleLog', gameId, message)
}