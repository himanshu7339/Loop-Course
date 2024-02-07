import jwt from "jsonwebtoken";
export const sendToken = (res, user, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  const options = {
    expire: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    message: message,
    user,
  });
};
