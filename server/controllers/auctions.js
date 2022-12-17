const Auction = require('../models/auction');
const cloudinary = require('../config/cloudinary');
const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const { validateAuction } = require('../validations/auction');

// @route    POST /api/auction
// @desc     Create auction in the DB
// @access   Private
module.exports.createAuction = asyncHandler(async (req, res, next) => {
  const auctionPayload = { ...req.body };

  delete auctionPayload.bids;
  delete auctionPayload.winner;
  auctionPayload.seller = req.user._id;

  const { error } = await validateAuction(auctionPayload);

  if (error)
    return res.status(400).json({
      success: false,
      status: 400,
      message: error.message,
      error,
    });

  const cloudImages = [];
  for (let i = 0; i < auctionPayload.images.length; i++) {
    try {
      const image = auctionPayload.images[i];
      const result = await cloudinary.uploader.upload(image, {
        folder: `auctioneer/auctions/${auctionPayload.seller}/`,
      });
      cloudImages.push({ publicId: result.public_id, url: result.secure_url });
    } catch (error) {
      const message = 'Unable to upload images. Try again after some time!';
      next(new ErrorResponse(500, message));
    }
  }

  auctionPayload.images = cloudImages;

  const auction = new Auction(auctionPayload);
  await auction.save();

  return res.status(201).json({
    success: true,
    status: 201,
    data: {
      _id: auction._id,
      ...auctionPayload,
    },
  });
});
