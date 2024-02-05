import express from "express";
import {
  addLecture,
  createCourse,
  deleteCourse,
  deleteLecture,
  getAllCourses,
  getCourseLecture,
} from "../controllers/courseController.js";
import singleUpload from "../middleware/multer.js";
import {
  authorizeAdmin,
  authorizeSubscribers,
  isAuth,
} from "../middleware/Auth.js";

const router = express.Router();

// create new course only admin
router
  .route("/createcourse")
  .post(isAuth, authorizeAdmin, singleUpload, createCourse);
// get all course array with lectures
router.route("/courses").get(getAllCourses);

// delete Course

router.route("/courses").get(getAllCourses);

// get course details , add lecture
router
  .route("/courses/:id")
  .get(isAuth, authorizeSubscribers, getCourseLecture)
  .post(isAuth, authorizeAdmin, singleUpload, addLecture)
  .delete(isAuth, authorizeAdmin, deleteCourse);

// delete lecture

router.route("/deletelecture").delete(isAuth, authorizeAdmin, deleteLecture);

export default router;
