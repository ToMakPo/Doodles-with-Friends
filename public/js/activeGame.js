let gameId

function generateGameId() {
    const id = Math.floor(Math.random() * 16**6).toString(16).toUpperCase().padStart('0', 6)
    return setGameId(id)
}

function setGameId(id) {
    gameId = id
    document.querySelector('#game-info').textContent = `game id: ${id}`
    setupSocket(id)
    return id
}

function getGameId() {
    console.log('got game id');
    return gameId
}