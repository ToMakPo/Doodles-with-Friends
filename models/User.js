const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,
            required: "Enter a username"
        },
        password: {
            type: String,
            required: true
        },
        joinDate: {
            type: Date,
            default: Date.now
        },
        gamesPlayed: {
            type: Number,
            default: 0
        },
        gamesWon: {
            type: Number,
            default: 0
        },
        totalPoints: {
            type: Number,
            default: 0
        }
    }
)

const User = mongoose.model("user", userSchema)

module.exports = User