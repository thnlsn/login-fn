const router = require('express').Router(); // Router to construct and use
const User = require('../models/user.model'); // User model
const { body, validationResult } = require('express-validator'); // Validator
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // To hash password
require('dotenv').config(); // Environment variables to keep keys secure

// @route     GET /auth/
// @desc      Read/get the data pertaining to the currently logged in user
// @access    PRIVATE (requires token)
router.get('/', (_, res) => {
  res.send('Read/get the data pertaining to the currently logged in user');
});

// @route         POST /auth/
// @desc          Post/submit form data to then authenticate the user (login).
// @access        PUBLIC (because everyone is allowed to try to log in)
// @validation    true
router.post(
  '/',
  body('email', 'Please enter an email address.').isEmail(),
  body('password', 'Please enter a password.').exists(),
  async (req, res) => {
    // If any express-validator check fails, send the above defined error message.
    const errors = validationResult(req);
    // If errors is NOT empty (so if there IS an error)
    if (!errors.isEmpty()) {
      // Respond with status 400 (bad request) and the error message
      return res.status(400).json({ msg: errors.array()[0].msg });
    }

    // Destructure user login inputs
    const { email, password } = req.body;

    try {
      // Find an account with the inputted email
      let user = await User.findOne({ email });

      // If that account exists, negate and skip this because it exists.
      // However if it does NOT exist, it will be negated to true and will execute
      if (!user) {
        res
          .status(400)
          .json({ msg: 'User does not exist. Try a different email.' });
      }

      // If there is a user, continue to authenticate the password
      // .compare() takes in the password as it was input at login, and the hash of the user in the database with the input email, to check them on eachother.
      // .compare(pass, hash) ===> true/false
      const isMatch = await bcrypt.compare(password, user.password);
      // If isMatch is not true, handle it with an error response
      if (!isMatch) {
        res
          .status(400)
          .json({ msg: 'Password is incorrect. Please try again.' });
      } // Otherwise move on...

      // At this point the user has been authenticated, their account exists in the database and the password they input matches the hash stored in the database. /// Now it is time to authorize via JWT.

      // Now we want to generate a token for the current session...
      const payload = { id: user.id }; // The data we want stored on the client for authorization purposes on protected routes

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error('auth.js' + err);
      res.json('Auth Routes Server Error');
    }
  }
);

module.exports = router;
