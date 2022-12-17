const router = require('express').Router();
const protect = require('../middlewares/protect');
const {
  createAuction,
  getUpcomingAuctions,
} = require('../controllers/auctions');

router.route('/auction').post(protect, createAuction).get(getUpcomingAuctions);

module.exports = router;
