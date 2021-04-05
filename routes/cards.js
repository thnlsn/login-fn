const router = require('express').Router();
let Card = require('../models/cards.model');

// GET ALL CARDS
router.route('/').get((req, res) => {
  Card.find()
    .then((cards) => res.json(cards))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// ADD A NEW CARD
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newCard = new Card({
    username,
    description,
    duration,
    date,
  });

  newCard
    .save()
    .then(() => res.json('Card added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// GET A SPECIFIC EXERCISE
router.route('/:id').get((req, res) => {
  Card.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// DELETE A SPECIFIC EXERCISE
router.route('/:id').delete((req, res) => {
  Card.findByIdAndDelete(req.params.id)
    .then(() => res.json('Card deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// UPDATE SPECIFIC EXERCISE
router.route('/update/:id').post((req, res) => {
  Card.findById(req.params.id)
    .then((card) => {
      card.username = req.body.username;
      card.description = req.body.description;
      card.duration = Number(req.body.duration);
      card.date = Date.parse(req.body.date);

      card
        .save()
        .then(() => res.json('Card updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
