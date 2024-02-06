import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/userModel.js";
import { sendToken } from "../utils/sendToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import { Course } from "../models/CourseModel.js";
import crypto from "crypto";
import { getDataUri } from "../utils/dataUri.js";
import cloudinary from "cloudinary";
import { Stats } from "../models/StatsModel.js";
// register user
export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(req)
  const file = req.file;
  console.log(file)
  if (!name || !email || !password || !file)
    return next(new ErrorHandler("Please provide all fields", 400));
  let user = await User.findOne({ email });
  if (user) return next(new ErrorHandler("User already exist", 409));

  // upload file on cloudinary

  const fileUri = getDataUri(file);
  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

  user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  sendToken(res, user, "Register Successfully");
});

// login user

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please provide all fields", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid User", 401));
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return next(new ErrorHandler(" Invalid User ", 401));
  sendToken(res, user, `Welcome back ${user.name}`, 200);
});

// logout user
export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json({
      success: true,
      message: "Logout Successfully",
    });
});

// get my profile

export const getMyProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    user,
  });
});

// change password
export const changePassword = catchAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword)
    return next(new ErrorHandler("Please provide all fields", 400));
  const user = await User.findById(req.user._id).select("+password");

  const isMatch = await user.comparePassword(oldPassword);
  if (!isMatch) return next(new ErrorHandler(" Password is not match ", 401));
  user.password = newPassword;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password change successfully",
  });
});

// update profile
export const updateProfile = catchAsyncError(async (req, res, next) => {
  const { name, email } = req.body;

  const user = await User.findById(req.user._id);

  if (name) {
    user.name = name;
  }
  if (email) {
    user.email = email;
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile update successfully",
  });
});

// Update Profile Avatar
export const updateProfileAvatar = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  // upload file on cloudinary
  const file = req.file;
  const fileUri = getDataUri(file);
  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
  await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  user.avatar = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };

  await user.save();
  res.status(200).json({
    success: true,
    message: "Avatar update successfully",
  });
});

// Forget password
export const forgetPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) return next(new ErrorHandler("User not found", 404));

  // get reset password token
  const resetToken = await user.getResetToken();
  await user.save();

  const url = `${process.env.FRONTEND__URL}/resetpassword/${resetToken}`;
  const message = ` Click on the link to reset your password. ${url} if you have not request then please ignore`;

  // send email
  await sendEmail(user.email, "Loop Course Reset Password", message);

  // send token by email
  res.status(200).json({
    success: true,
    message: `Reset token has been send to ${user.email}`,
  });
});

// Reset password
export const resetPassword = catchAsyncError(async (req, res, next) => {
  const { token } = req.params;
  // get reset password token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  // find user through resetPasswordToken which is save in limited time
  const user = await User.findOne({
    resetPasswordExpire: {
      $gt: Date.now(),
    },
    resetPasswordToken,
  });

  // if user not find send error
  if (!user) return next(new ErrorHandler("token is invalid or expire"));
  user.password = req.body.password;

  // after change password this find will undefined
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password update successfully",
  });
});

// add to playlist
export const addToPlayList = catchAsyncError(async (req, res, next) => {
  const { id } = req.body;
  const user = await User.findById(req.user._id);

  const course = await Course.findById(id);

  if (!course) return next(new ErrorHandler("User Id is Incorrect", 400));

  // check if item already exist in playlist array
  const itemExist = user.playlist.find((item) => {
    if (item.course.toString() === course._id.toString()) {
      return true;
    }
  });
  if (itemExist) {
    return next(new ErrorHandler("Course already added in playlist"));
  }
  user.playlist.push({
    course: course._id,
    poster: course.poster.url,
  });

  await user.save();
  res.status(200).json({
    success: true,
    message: "Added to playlist ",
  });
});

// remove from playlist

export const removeToPlayList = catchAsyncError(async (req, res, next) => {
  const { id } = req.query;
  const user = await User.findById(req.user._id);

  const course = await Course.findById(id);

  if (!course) return next(new ErrorHandler("User Id is Incorrect", 400));

  const newPlaylist = user.playlist.filter((item) => {
    if (item.course.toString() !== course._id.toString()) {
      return item;
    }
  });

  user.playlist = newPlaylist;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Removed from playlist ",
  });
});

// admin routers

export const getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

// update user role
export const updateUserRole = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new ErrorHandler("User not found", 404));
  if (user.role === "user") user.role = "admin";
  else user.role = "user";

  await user.save();
  res.status(200).json({
    success: true,
    message: "user role update successfully",
  });
});

// delete user
export const deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new ErrorHandler("User not found", 404));
  await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  // cancel Subscription
  await user.deleteOne();
  res.status(200).json({
    success: true,
    message: "User Deleted Done",
  });
});
// delete my profile
export const deleteMyProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  // cancel Subscription
  await user.deleteOne();
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "User Deleted Done",
    });
});

User.watch().on("change", async () => {
  const state = await Stats.find({}).sort({ createdAt: "desc" }).limit(1);
  const subscription = await User.find({ "subscription.status": "active" });
  state[0].subscription = subscription.length;
  state[0].users = await User.countDocuments();
  state[0].subscription = subscription.length;
  state[0].createAt = new Date(Date.now());
  await state[0].save();
});
