import { app } from "./app.js";
import cloudinary from "cloudinary";
import razorpay from "razorpay";
import nodeCron from "node-cron";
import { Stats } from "./models/StatsModel.js";

// Razorpay instance
export const instance = new razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

// cloudinary instance
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.API_SECRET,
});

nodeCron.schedule("0 0 0 1 * *", async () => {
  try {
    await Stats.create({});
  } catch (error) {
    console.log(error);
  }
});

app.get("/", (req, res) => {
  res.send("<h1>Fine</h1>");
});
app.listen(process.env.PORT, () => {
  console.log("Server is working on port", process.env.PORT);
});
