const router = require('express').Router();
let User = require('../models/user.model');

// @route     GET /users/
// @desc      Read/get all users who are in the database
// @access    Public
router.route('/').get((req, res) => {
  // Find all users that match
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// @route     POST /users/add
// @desc      Register/post a new user to the database
// @access    Public
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const newUser = new User({ username });

  newUser
    .save()
    .then(() => res.json(`User ${username} added!`))
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
