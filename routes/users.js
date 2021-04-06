const router = require('express').Router();
const User = require('../models/user.model');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // To hash password

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
  // express-validator checks
  body('username', 'Please enter a username with at least 3 characters.')
    .not()
    .isEmpty()
    .isLength({ min: 3 }),
  body('email', 'Please enter a valid email address.').isEmail(),
  body(
    'password',
    'Please enter a a password with at least 6 characters.'
  ).isLength({ min: 6 }),
  async (req, res) => {
    // If any express-validator check fails, send the above defined error message.
    const errors = validationResult(req);
    // If errors is NOT empty (so if there IS an error)
    if (!errors.isEmpty()) {
      // Respond with status 400 (bad request) and the error message
      return res.status(400).json({ msg: errors.array()[0].msg });
    }

    // Destructure user inputs from req.body
    const { username, email, password } = req.body;

    try {
      // Check if user inputted email already exists in db
      // Set newUser to the user with the email inputted
      let newUser = await User.findOne({ email });
      // If there is a user with that email, send this error
      if (newUser) {
        return res.status(400).json({
          msg: `Account with email ${email} already exists! Please try a different email.`,
        });
      }
      newUser = await User.findOne({ username });
      // If there is a user with that email, send this error
      if (newUser) {
        return res.status(400).json({
          msg: `Account with username: ${username} already exists! Please use a different username.`,
        });
      }

      // Otherwise there was not a user with that email and we are safe to proceed
      // Construct User given an object/json body (not saved yet, just initialized)
      newUser = new User({ username, email, password });

      // Generate a bcrypt salt
      const salt = await bcrypt.genSaltSync(10);

      // Mutate the password as it was originally stored in newUser constructor
      newUser.password = await bcrypt.hash(password, salt);

      // Call the save method to save it to the database to the collection (which is determined in the schema, if it is the first item to be saved, the collection will be generated and pluralized with an s at the end, unless it already has)
      await newUser.save(); // Save it
      res.json({ msg: `User ${username} added!` }); // Once saved, tell the user

      // Now we want to generate a token for the current session...
      //jwt.sign(payload, secretOrPrivateKey, [options, callback])

      // payload is what we want to send back to the user once
      const payload = {};
      //
    } catch (err) {
      // If any undefined errors still occur, send a generic error message with the error
      res.status(500).json('Users Route Server Error: ' + err);
    }
  }
);

module.exports = router;
