const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: { type: String, required: true }, //Tên đăng nhập
  password: { type: String, required: true }, //Mật khẩu người dùng
  fullName: { type: String },
  phoneNumber: { type: String },
  email: { type: String, required: true },
  isAdmin: { type: Boolean, default: false, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
