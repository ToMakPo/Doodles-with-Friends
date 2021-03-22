const router = require("express").Router();
const db = require('../models');

router.get('/lobby/:id', (req, res) => {
    db.Lobby
        .find({ id: req.params.id })
        .then(data => res.json(data))
        .catch(err => res.status(422).json(err))
})

router.post('/lobby', (req, res) => {
    db.Lobby
        .create(req.body)
        .then(data => res.json(data))
        .catch(err => res.status(422).json(err))
})

router.put('/lobby/:id', (req, res) => {
    db.Lobby
        .findOneAndUpdate({ id: req.params.id }, req.body)
        .then(data => res.json(data))
        .catch(err => res.status(422).json(err));
})

// This route is called by the corresponding API.js front end route which returns the user to be rendered in the PlayerList component.
router.get('/user/:id', (req, res) => {
    db.User
        .findById(req.params.id)
        .then(data => res.json(data))
        .catch(err => res.status(422).json(err))
})

router.put('/user/:id', (req, res) => {
    db.User
        .findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(data => res.json(data))
        .catch(err => res.status(422).json(err))
})
module.exports = router;