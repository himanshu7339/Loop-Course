import express from "express";
import { isAuth } from "../middleware/Auth.js";
import {
  buySubscription,
  cancelSubscription,
  paymentVerification,
  razorpayKey,
} from "../controllers/paymentController.js";

const router = express.Router();

// buy subscription

router.route("/subscribe").get(isAuth, buySubscription);
// payment Verify
router.route("/paymentverification").post(isAuth, paymentVerification);

// payment key route
router.route("/razorpaykey").get(razorpayKey);



// cancel subscription
router.route("/subscribe/cancel").delete(isAuth,cancelSubscription);

export default router;
