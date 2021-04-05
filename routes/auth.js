const router = require('express').Router();

// @route     GET /auth/
// @desc      Read/get the data pertaining to the currently logged in user
// @access    PRIVATE (requires token)
router.get('/', (req, res) => {
  res.send('Read/get the data pertaining to the currently logged in user');
});

// @route     POST /auth/
// @desc      Post/submit form data to then authenticate the user and log them in, while also generating a token
// @access    PUBLIC (because everyone is allowed to try to log in, it is once a token is recieved that routes will then be private to that specific user)
router.get('/', (req, res) => {
  res.send('Read/get the data pertaining to the currently logged in user');
});

module.exports = router;
