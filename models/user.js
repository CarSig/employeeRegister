const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    username: { type: String, required: true, min: 3, max: 20, unique: true },
    email: { type: String, required: true, max: 50, unique: true },
    lastName: { type: String, default: "Default Surname" },
    firstName: { type: String, default: "Default Name" },
    address: { type: String, default: "Default Address" },
    role: { type: String, default: "Default Role" },
    password: { type: String, required: true, min: 6 },
    comments: { type: Array, default: [] },
    isAdmin: { type: Boolean, default: false },
    imgNumber: { type: Number },
    gender: { type: String },
    date: {
      type: String,
      default: Date.now(),
    },
  },
  { timestamps: true }
);
const User = mongoose.model("UserInfo", UserSchema);

module.exports = User;
