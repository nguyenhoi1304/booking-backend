const User = require("../models/User");

//UPDATE User
exports.putUser = async (req, res, next) => {
  try {
    // Tìm id và nội dung cần update
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

//DELETE User
exports.deleteUser = async (req, res, next) => {
  try {
    // xóa User dựa trên params id
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User đã được xóa");
  } catch (err) {
    next(err);
  }
};

//GET User by id
exports.getUser = async (req, res, next) => {
  try {
    // lấy User dựa trên params id
    const User = await User.findById(req.params.id);
    res.status(200).json(User);
  } catch (err) {
    next(err);
  }
};

//GET All User
exports.getAllUser = async (req, res, next) => {
  try {
    // lấy ra tất cả User
    const Users = await User.find();
    res.status(200).json(Users);
  } catch (err) {
    next(err);
  }
};
