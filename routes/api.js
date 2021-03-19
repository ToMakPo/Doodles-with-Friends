const path = require("path");
const router = require("express").Router();
const db = require('../models')
// const apiRoutes = require("./api");

// // API Routes
// router.use("/api", apiRoutes);
router.get('/api/lobby/:id', (req, res) => {
    db.Lobby
        .find({ id: req.params.id })
        .then(data => res.json(data))
        .catch(err => console.error(err))
})
router.post('/api/lobby', (req, res) => {
    db.Lobby
        .create(req.body)
        .then(data => res.json(data))
        .catch(err => console.error(err))
})

// If no API routes are hit, send the React app
// router.use(function (req, res) {
//     res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

module.exports = router;