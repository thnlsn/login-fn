const router = require('express').Router();
let Card = require('../models/cards.model');

// @route     GET /cards/
// @desc      Read/get all cards of a specific user
// @access    Private (because only the logged in user should see all their cards)
router.route('/').get((req, res) => {
  Card.find()
    .then((cards) => res.json(cards))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// @route     PUT /cards/add
// @desc      Add a new card
// @access    Private (because we are adding to the logged in users account)
router.route('/add').post((req, res) => {
  const front = req.body.front;
  const back = req.body.back;

  const newCard = new Card({
    front,
    back,
  });

  newCard
    .save()
    .then(() =>
      res.json(`Card added!
                Front: ${front}
                Back: ${back}`)
    )
    .catch((err) => res.status(400).json('Error: ' + err));
});

// @route     PUT /cards/update/:id
// @desc      Update an existing card
// @access    Private (because we are updated logged in users card)
router.route('/update/:id').put((req, res) => {
  Card.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(() =>
      res.json(`Card updated!
                  Front: ${req.body.front}
                  Back: ${req.body.back}`)
    )
    .catch((err) => res.status(400).json('Error: ' + err));
});

// @route     DELETE /cards/update/:id
// @desc      Delete an existing card
// @access    Private (because we are deleting logged in users card)
router.route('/delete/:id').delete(({ params: { id } }, res) => {
  // Remove by the id of the request params destructured
  Card.findByIdAndRemove(id)
    .then(() => res.json('Card deleted!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
