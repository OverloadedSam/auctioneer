const router = require('express').Router();
const protect = require('../middlewares/protect');
const { createAuction } = require('../controllers/auctions');

router.route('/auction').post(protect, createAuction);

module.exports = router;
