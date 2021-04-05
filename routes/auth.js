const router = require('express').Router();

// @route     GET /auth/
// @desc      Read/get the data pertaining to the currently logged in user
// @access    Private
router.get('/', (req, res) => {
  res.send('Read/get the data pertaining to the currently logged in user');
});

module.exports = router;
