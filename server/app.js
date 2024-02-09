import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/mongodb.js";
import { ErrorMiddleware } from "./middleware/Error.js";
import cookieParser from "cookie-parser";
import cors from "cors"
dotenv.config({ path: "./config/config.env" });
export const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}))
app.use(cookieParser())
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
    methods:["GET","POST","PUT","DELETE"]
}))

connectDb()

// imports  routers
import course from "./routes/courseRoute.js"
import user from "./routes/userRoute.js"
import payment from "./routes/paymentRoute.js"
import other from "./routes/otherRoute.js"


app.use("/api/v1",course)
app.use("/api/v1",user)
app.use("/api/v1",payment)
app.use("/api/v1",other)



app.use(ErrorMiddleware)