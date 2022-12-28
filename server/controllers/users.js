const User = require('../models/user');
const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const { validateRegister, validateLogin } = require('../validations/user');
const Auction = require('../models/auction');

// @route    POST /api/register
// @desc     Register user to the DB
// @access   Public
module.exports.registerUser = asyncHandler(async (req, res, next) => {
  const userPayload = { ...req.body };

  const { error } = await validateRegister(userPayload);

  if (error)
    return res.status(400).json({
      success: false,
      status: 400,
      message: error.message,
      error,
    });

  const user = new User(userPayload);
  await user.save();

  const token = user.generateAuthToken();

  return res
    .status(201)
    .header('x-auth-token', token)
    .json({
      success: true,
      status: 201,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        token,
      },
    });
});

// @route    POST /api/login
// @desc     Login user by sending jwt
// @access   Public
module.exports.loginUser = asyncHandler(async (req, res, next) => {
  const userPayload = { ...req.body };

  const { error } = await validateLogin(userPayload);

  if (error)
    return res.status(400).json({
      success: false,
      status: 400,
      message: error.message,
      error,
    });

  const user = await User.findOne({ email: userPayload.email });
  if (!user)
    return next(new ErrorResponse(401, 'This email is not registered!'));

  if (!(await user.matchPassword(userPayload.password)))
    return next(new ErrorResponse(401, 'Invalid password!'));

  const token = user.generateAuthToken();

  res
    .status(200)
    .header('x-auth-token', token)
    .json({
      success: true,
      status: 200,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        token,
      },
    });
});

// @route    GET /api/profile
// @desc     Get details of logged in user
// @access   Private
module.exports.getUserProfile = asyncHandler(async (req, res, next) => {
  let user = req.user;

  if (!user) return next(new ErrorResponse(401, 'Unauthorized access!'));

  const auctionsWonCount = await Auction.find({ winner: user._id }).count();
  const auctionsInitiatedCount = await Auction.find({
    seller: user._id,
  }).count();

  user = { ...req.user._doc };
  user.auctionsWonCount = auctionsWonCount;
  user.auctionsInitiatedCount = auctionsInitiatedCount;
  delete user.password;
  delete user.updatedAt;
  delete user.__v;

  res.status(200).json({
    success: true,
    status: 200,
    data: user,
  });
});
