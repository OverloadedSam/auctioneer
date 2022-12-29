const router = require('express').Router();
const protect = require('../middlewares/protect');
const {
  registerUser,
  loginUser,
  getUserProfile,
  changeUserAvatar,
} = require('../controllers/users');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.route('/profile').get(protect, getUserProfile);
router.patch('/profile/changeAvatar', protect, changeUserAvatar);

module.exports = router;
