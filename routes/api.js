const router = require("express").Router();
const db = require('../models');
const wordbank = require('../lib/wordBank')

router.get('/lobby/:code', (req, res) => {
    db.Lobby
        .find({ code: req.params.code })
        .then(data => res.json(data))
        .catch(err => res.status(422).json(err))
})

router.post('/lobby', (req, res) => {
    db.Lobby
        .create(req.body)
        .then(data => res.json(data))
        .catch(err => res.status(422).json(err))
})

router.put('/lobby/:code', (req, res) => {
    db.Lobby
        .findOneAndUpdate({ code: req.params.code }, req.body)
        .then(data => res.json(data))
        .catch(err => res.status(422).json(err));
})

router.delete('/lobby/:code', (req, res) => {
    db.Lobby
        .findOneAndDelete({ code: req.params.code })
        .then(data => data.remove())
        .then(data => res.json(data))
        .catch(err => res.status(422).json(err))
})

// This route is called by the corresponding API.js front end route which returns the user to be rendered in the PlayerList component.
router.get('/user/:id', (req, res) => {
    db.User
        .findById(req.params.id)
        .then(data => res.json(data))
        .catch(err => res.status(422).json(err))
})

router.post('/users', (req, res) => {
    db.User
        .find()
        .where('_id')
        .in(req.body)
        .then(data => res.json(data))
        .catch(err => res.status(422).json(err))
})

router.put('/user/:id', (req, res) => {
    db.User
        .findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(data => res.json(data))
        .catch(err => res.status(422).json(err))
})

router.get('/wordbank/catagories', (req, res) => {
    const catagories = wordbank.getCategories();
    res.json(catagories)
})

router.get('/wordbank/:category', (req, res) => {
    const category = req.params.category
    res.json(wordbank.getCategory(category))
})

module.exports = router;