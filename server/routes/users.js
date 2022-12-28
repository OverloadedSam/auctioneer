const router = require('express').Router();
const protect = require('../middlewares/protect');
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require('../controllers/users');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.route('/profile').get(protect, getUserProfile);

module.exports = router;
