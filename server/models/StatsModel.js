import Mongoose from "mongoose";

const schema = new Mongoose.Schema({
  users: {
    type: Number,
    default: 0,
  },
  subscription: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  createAt: {
    type:Date,
    default: Date.now(),
  },
});

export const Stats = Mongoose.model("Stats", schema);
