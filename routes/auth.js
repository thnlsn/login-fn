const router = require('express').Router(); // Router to construct and use
const User = require('../models/user.model'); // User model
const { body, validationResult } = require('express-validator'); // Validator
const bcrypt = require('bcryptjs'); // Not to hash, but to compare to hashed

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
        res.status(400).json({ msg: 'Invalid credentials. Please try again' });
      }

      // If there is a user, continue to check the password
      // .compare() takes in the password as it was input at login, and the hash of the user in the database with the input email, to check them on eachother.
      // .compare(pass, hash) ===> true/false
      const isMatch = await bcrypt.compare(password, user.password);
      // If isMatch is not true, handle it with an error response
      if (!isMatch) {
        res
          .status(400)
          .json({ msg: 'Password is incorrect. Please try again.' });
      } // Otherwise move on...
    } catch (err) {}
  }
);

module.exports = router;
