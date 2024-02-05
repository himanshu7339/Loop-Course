import express from "express";
import { authorizeAdmin, isAuth } from "../middleware/Auth.js";
import { contact, courseRequest, getAdminDashboardStats } from "../controllers/otherController.js";

const router = express.Router();

// contact from
router.route("/contact").post(contact);
// course req
router.route("/courserequest").post(courseRequest);
// get admin Dashboard stats
router.route("/admin/stats").get(isAuth,authorizeAdmin, getAdminDashboardStats);
export default router;
