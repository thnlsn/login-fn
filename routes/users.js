const router = require('express').Router();
let User = require('../models/user.model');
const { body, validationResult } = require('express-validator');

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
  (req, res) => {
    const { username, email, password } = req.body; // Destructure body properties

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array()[0].msg);
    }

    //
    //
    //
    //
    // Construct User given an object/json body
    const newUser = new User({ username, email, password });

    // Call the save method to save it to the database to the collection (which is determined in the schema, if it is the first item to be saved, the collection will be generated and pluralized with an s at the end, unless it already has)
    newUser
      .save() // Save it
      .then(() => res.json(`User ${username} added!`)) // Once saved, tell the user
      .catch((err) => res.status(400).json('Users Route Error: ' + err));
  }
);

module.exports = router;
