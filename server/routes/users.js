const router = require('express').Router();
const { registerUser } = require('../controllers/users');

router.post('/register', registerUser);

module.exports = router;
