// @ts-nocheck
import asyncHandler from 'express-async-handler';
// import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

// @desc Auth user & get token
// @desc POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      isAdmin: user.isAdmin,
      auth: req.session.userId,
    });

    console.log(req.session.userId);

    // store user id session
    // this will set a cookie on the user
    // keep them logged in
    req.session.userId = user.id;

    return { user };
  } else {
    res.status(401);
    throw new Error('Invalid Email or Password');
  }
});

// @desc Register a new user
// @desc POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    fullname,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      isAdmin: user.isAdmin,
      auth: (req.session.userId = user._id),
    });

    // store user id session
    // this will set a cookie on the user
    // keep them logged in
    req.session.userId = user._id;

    return { user };
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc GET user profile
// @desc GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc UPDATE user profile
// @desc PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.fullname = req.body.fullname || user.fullname;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      fullname: updatedUser.fullname,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      //   token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc GET all users
// @desc GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (_, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc DELETE a user
// @desc DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc GET a user
// @desc GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc UPDATE user profile
// @desc PUT /api/users/profile
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.fullname = req.body.fullname || user.fullname;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      fullname: updatedUser.fullname,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
