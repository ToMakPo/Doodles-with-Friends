const mongoose = require("mongoose")
const User = require("./User")
const wordBank = require('../lib/wordBank')

const lobbySchema = new mongoose.Schema(
    {
        code: { //The lobby code that will be displayed to the players. Not to be confused with _id used by the database.
            type: String,
            trim: true
        },
        host: { //The player that is hosting this lobby
            type: mongoose.Schema.Types.ObjectId,
            ref: User
        },
        games: [{ //A list of games played in this lobby
            category: String, //The catagory of the words being played
            wordList: [String], //The list of words that could be selected 
            rotations: {
                type: Number,
                default: 5
            },
            rounds: [{
                answer: [String],
                artist: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: User
                },
                winner: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: User
                }
            }],
            playerIndex: Number,
            currentRotation: Number,
            players: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: User
            }],
            winner: {
                type: mongoose.Schema.Types.ObjectId,
                ref: User
            },
            results: [{
                playerId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: User
                },
                username: String,
                score: Number,
                rank: Number
            }]
        }],
        rules: {
            rotations: {
                type: Number,
                default: 3
            },
            category: {
                type: String,
                default: 'any'
            }
        },
        chatLog: [{
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: User
            }, 
            username: String,
            messageType: String,
            text: String,
            timeStamp: {
                type: Date,
                default: Date.now
            }
        }],
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

const Lobby = mongoose.model("lobby", lobbySchema)

module.exports = Lobby
