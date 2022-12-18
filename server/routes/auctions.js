const router = require('express').Router();
const protect = require('../middlewares/protect');
const verifyId = require('../middlewares/verifyId');
const {
  createAuction,
  getUpcomingAuctions,
  getAuctionDetails,
} = require('../controllers/auctions');

router.route('/auction').post(protect, createAuction).get(getUpcomingAuctions);
router.route('/auction/:id').get(verifyId('id'), getAuctionDetails);

module.exports = router;
