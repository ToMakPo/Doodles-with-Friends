const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        username: {
            type: String,
            trim: true,
            required: "Enter a username"
        },
        hash: String,
        joinDate: {
            type: Date,
            default: Date.now
        }
    }
)

const User = mongoose.model("user", userSchema)

module.exports = User
