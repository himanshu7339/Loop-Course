import express from "express";
import {
  addToPlayList,
  changePassword,
  deleteMyProfile,
  deleteUser,
  forgetPassword,
  getMyProfile,
  login,
  logout,
  register,
  removeToPlayList,
  resetPassword,
  updateProfile,
  updateProfileAvatar,
  updateUserRole,
} from "../controllers/userController.js";
import { authorizeAdmin, isAuth } from "../middleware/Auth.js";
import singleUpload from "../middleware/multer.js";
import { getAllCourses } from "../controllers/courseController.js";

const router = express.Router();

// register a new user
router.route("/register").post(singleUpload, register);
// login user
router.route("/login").post(login);
// logout user
router.route("/logout").get(logout);

// get my profile
router.route("/me").get(isAuth, getMyProfile);
// Delete my profile
router.route("/me").delete(isAuth, deleteMyProfile);

// change password
router.route("/changepassword").put(isAuth, changePassword);
// update profile
router.route("/updateprofile").put(isAuth, updateProfile);
// update profile avatar
router.route("/updateprofilepicture").put(isAuth, updateProfileAvatar);
// forget password
router.route("/forgetpassword").post(forgetPassword);
// reset password
router.route("/resetpassword/:token").put(resetPassword);
// add to playlist
router.route("/addtoplaylist").post(isAuth, addToPlayList);
// remove to playlist
router.route("/removefromplaylist").delete(isAuth, removeToPlayList);


// admin routes
router.route("/admin/users").get(isAuth,authorizeAdmin,getAllCourses)
router.route("/admin/user/:id").put(isAuth,authorizeAdmin,updateUserRole).delete(isAuth,authorizeAdmin,updateUserRole,deleteUser)
export default router;
