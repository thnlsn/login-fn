const router = require('express').Router();

// @route     GET /auth/
// @desc      Read/get the data pertaining to the currently logged in user
// @access    PRIVATE (requires token)
router.get('/', (_, res) => {
  res.send('Read/get the data pertaining to the currently logged in user');
});

// @route     POST /auth/
// @desc      Post/submit form data to then authenticate the user.
// @access    PUBLIC (because everyone is allowed to try to log in)
router.post('/', (req, res) => {
  res.send(
    'Post/submit form data to then authenticate the user and log them in, while also generating a token'
  );
});

module.exports = router;
