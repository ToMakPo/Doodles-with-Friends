const mongoose = require("mongoose")
const User = require("./User")
const wordBank = './wordBank.json'

const lobbySchema = new mongoose.Schema(
    {
        id: { //The game id that will be displayed to the players. Not to be confused with _id used by the database.
            type: String,
            trim: true
        },
        host: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User
        },
        games: [{
            category: String,
            wordBank: [String],
            maxRotations: {
                type: Number,
                default: 5
            },
            rounds: [{
                answer: String,
                artist: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: User
                },
                winner: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: User
                }
            }],
            activeIndex: Number,
            activeRotation: Number,
            winner: {
                type: mongoose.Schema.Types.ObjectId,
                ref: User
            }
        }],
        userWords: [String],
        players: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: User
        }],
        startDate: {
            type: Date,
            default: Date.now
        },
        endDate: {
            type: Date,
            default: null
        }
    }
)

/**Add a player to the lobby before the game starts.
 * 
 * @param {mongoose.Schema.Types.ObjectId} playerId
 */
lobbySchema.methods.addPlayerToLobby = function (player) {
    player.activeLobby = this
    player.save()

    this.players.push(player)
    this.save()

    return this
}

/**
 * Words given by the users before the game starts.
 * @param {[String]} words An array of words that will be added to the word bank.
 */
lobbySchema.method.addUserWordsToGame = function (words) {
    this.userWords.concat(words)
    this.save()

    return this
}

/** Move to the next player in the queue */
lobbySchema.methods.randomizePlayerOrder = function () {
    const tempList = [...this.players]
    this.players = []

    while (tempList.length > 0) {
        const len = tempList.length
        const randomIndex = Math.floor(Math.random() * len - 1)
        const randomPlayer = tempList.splice(randomIndex, 1)
        this.players.push(randomPlayer)
    }
    this.save()

    return this
}

/**
 * Create a bank of words to choose from for the game.
 * @param {String} category the catagory of the words being played. 
 * @returns {[String]} the list of words to add to the word bank.
 */
lobbySchema.methods.buildWordBank = function (category) {
    const set = new Set(this.userWords)

    const options = [...wordBank[category]]

    while (set.size < 100 && options.length > 0) {
        const rand = Math.floor(Math.random() * options.length - 1)
        const word = options.splice(rand, 1)
        set.add(word)
    }

    this.userWords = []
    this.save()

    return [...set]
}

/**
 * Start the new game.
 * @param {String} category The catagory of the words being played.
 * @param {Number} maxRotations The maximumn number of rotations.
 */
lobbySchema.methods.startNewGame = function (category, maxRotations) {
    this.randomizePlayerOrder()

    const newGame = {
        id: Math.floor(Math.random() * 36 ** 9).toString(36).toUpperCase().padStart(9, '0'),
        category,
        wordBank: this.buildWordBank(),
        maxRotations,
        rounds: [],
        activeIndex: -1,
        activeRotation: 0,
        activeRound: null,
        winner: null
    }
    this.games.push(newGame)
    this.save()

    return this
}

/**
 * Start the next round of the game.
 * @param {Lobby.game} game The game being played
 */
lobbySchema.methods.startNextRound = function (game) {
    game.activeIndex = (game.activeIndex + 1) % this.players.length
    if (game.activeIndex === 0) game.activeRotation++
    const artist = this.players[game.activeIndex]
    if (artist.activeLobby === this) { //Check that this artist has not left the lobby.
        if (game.activeRotation < game.maxRotations) {
            const round = {
                answer: game.wordBank.splice(Math.floor(Math.random() * game.wordBank.length - 1), 1),
                artist,
                winner: null
            }
            game.rounds.push(round)
            game.activeRound = round
        } else {
            //TODO: end the game.
        }

        this.save()
        return this
    } else {
        return this.startNextRound(game)
    }
}

/**
 * End this round and start the next.
 * @param {Lobby.game} game The game being played
 * @param {mongoose.Schema.Types.ObjectId} winnerId The id of the winner for this round.
 */
lobbySchema.methods.endRound = function (game, winnerId) {
    game.activeRound.winner = winnerId
    this.save()
    this.startNextRound(game)
    return this
}

/**
 * End the game.
 * @param {Lobby.game} game The game being played
 */
lobbySchema.methods.endGame = function (game) {
    const players = this.players.reduce((obj, player) => obj[player] = 0, {})
    for (const round of game.rounds) {
        if (game.winner != null) {
            players[round.artist]++
            players[round.winner]++
            round.artist.totalPoints++
            round.winner.totalPoints++
        }
    }

    const [gameWinner] = Object
        .entries(players)
        .reduce(([current, max], { player, total }) =>
            total > max ? [player, total] : [current, max], [null, 0])

    gameWinner.gamesWon++
    this.players.forEach(player => {
        player.gamesPlayed++
        player.activeGame = null
        player.save()
    });

    game.winner = gameWinner
    this.save()
}

/** Close this lobby */
lobbySchema.methods.closeLobby = function () {
    endDate = Date.now()
    this.save()

    this.players.forEach(player => {
        player.activeLobby = null
        player.save()
    });
}

const Lobby = mongoose.model("lobby", lobbySchema)

module.exports = Lobby
