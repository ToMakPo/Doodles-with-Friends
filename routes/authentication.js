const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const util = require("util");
const passwordHash = require("../config/passwordHash");
const authenticateUser = require("./middleware/authenticateUser");
const validateBodyWith = require("./middleware/validateBodyWith");
const { loginValidator, registerValidator } = require("./validation");
const { User } = require("../models");

const jwtSign = util.promisify(jwt.sign);

router.post("/authenticated", authenticateUser, (req, res) => {
    res.json(req.user);
});

router.post("/login", validateBodyWith(loginValidator), async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const user =
            await User
                .findOne({ username })
                // Restrict the data loaded from the user model
                .select("name username password");
        if (!user) {
            // User not found by username.
            return res.status(404).json({ default: "username or password is invalid." });
        }

        const {
            password: encryptedPassword,
            // User object without the password
            ...secureUser
        } = user._doc;

        const isMatch = await bcrypt.compare(password, encryptedPassword);

        if (!isMatch) {
            // User's password is invalid.
            return res.status(404).json({ default: "username or password is invalid." });
        }

        const payload = {
            id: secureUser._id,
            username: secureUser.username
        };

        // Create a signed JWT token to send back to the client for reauthentication.
        const token = await jwtSign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: 31556926 // 1 year in seconds
            }
        );

        return res.json({
            success: true,
            token: "Bearer " + token,
            user: secureUser
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ default: "Something went wrong trying to log in." });
    }
});

router.post("/register", validateBodyWith(registerValidator), async (req, res) => {

    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (user) {
            // User already exists error.
            return res.status(400).json({ username: "username already exists." });
        }

        const newUser = new User({
            username,
            password: await passwordHash(password)
        });

        await newUser.save();

        const {
            password: encryptedPassword,
            // User object without the password
            ...secureUser
        } = newUser._doc;

        res.json(secureUser);

    } catch (err) {
        console.error(err);
        res.status(500).json({ default: "Something went wrong creating your account." });
    }
});

module.exports = router;
