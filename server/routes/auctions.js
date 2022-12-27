const router = require('express').Router();
const protect = require('../middlewares/protect');
const verifyId = require('../middlewares/verifyId');
const {
  createAuction,
  getUpcomingAuctions,
  getAuctionDetails,
  getAuctionsByUser,
  getWonAuctionsByUser,
} = require('../controllers/auctions');

router.route('/auction').post(protect, createAuction).get(getUpcomingAuctions);
router.route('/auction/:id').get(verifyId('id'), getAuctionDetails);
router.get('/auctions/myAuctions', protect, getAuctionsByUser);
router.get('/auctions/won', protect, getWonAuctionsByUser);

module.exports = router;
