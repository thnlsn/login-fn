const router = require('express').Router();
const User = require('../models/user.model');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// @route     GET /users/
// @desc      Read/get all users who are in the database
// @access    Public
router.get('/', (req, res) => {
  // Find all users that match
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json('Users Route Error: ' + err));
});

// @route         POST /users/add
// @desc          Register/post a new user to the database
// @access        Public
// @validation    true
router.post(
  '/add',
  body('username', 'Please enter a valid email username.').not().isEmpty(),
  body('email', 'Please enter a valid email address.').isEmail(),
  body(
    'password',
    'Please enter a a password with at least 6 characters.'
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);

    // If errors is NOT empty (so if there IS an error)
    if (!errors.isEmpty()) {
      // Respond with status 400 (bad request) and the error message
      return res.status(400).json(errors.array()[0].msg);
    }

    // Destructure user inputs from req.body
    const { username, email, password } = req.body;

    try {
      // Construct User given an object/json body (not saved yet, just initialized)
      const newUser = new User({ username, email, password });

      // Generate a bcrypt salt
      const salt = await bcrypt.genSaltSync(10);

      // Mutate the password as it was originally stored in newUser constructor
      newUser.password = await bcrypt.hash(password, salt);

      // Call the save method to save it to the database to the collection (which is determined in the schema, if it is the first item to be saved, the collection will be generated and pluralized with an s at the end, unless it already has)
      await newUser.save(); // Save it
      res.json(`User ${username} added!`); // Once saved, tell the user
    } catch (err) {
      res.status(500).json('Users Route Server Error: ' + err);
    }
  }
);

module.exports = router;
