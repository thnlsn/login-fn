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
  body(
    'email',
    'That email address does not exist. Please try another.'
  ).isEmail(),
  body('password', 'Please enter a password.').exists(),
  async (req, res) => {
    // If any express-validator check fails, send the above defined error message.
    const errors = validationResult(req);
    // If errors is NOT empty (so if there IS an error)
    if (!errors.isEmpty()) {
      // Respond with status 400 (bad request) and the error message
      return res.status(400).json({ msg: errors.array()[0].msg });
    }
  }
);

module.exports = router;
