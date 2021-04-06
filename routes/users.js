const router = require('express').Router();
let User = require('../models/user.model');

// @route     GET /users/
// @desc      Read/get all users who are in the database
// @access    Public
router.route('/').get((req, res) => {
  // Find all users that match
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json('Users Route Error: ' + err));
});

// @route     POST /users/add
// @desc      Register/post a new user to the database
// @access    Public
router.route('/add').post((req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({ username, email, password });

  newUser
    .save()
    .then(() => res.json(`User ${username} added!`))
    .catch((err) => res.status(400).json('Users Routes Error: ' + err));
});

module.exports = router;
