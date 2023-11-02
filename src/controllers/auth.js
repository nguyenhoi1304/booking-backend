const User = require("../models/User");
const bcrypt = require("bcryptjs");

//Register
exports.register = async (req, res, next) => {
  //hash password để tăng độ an toàn cho password
  const hash = bcrypt.hashSync(req.body.password);
  try {
    await User.create({
      email: req.body.email,
      username: req.body.username,
      password: hash,
    }).then((user) =>
      res.status(200).json({
        message: "Tạo tài khoản thành công",
        user,
      })
    );
  } catch (err) {
    res.status(401).json({
      message: " Tạo tài khoản thất bại ",
      error: err.message,
    });
  }
};

// Login
exports.login = async (req, res, next) => {
  //hash password
  const hash = bcrypt.hashSync(req.body.password);
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).send("User not found");
    }
    //compare password ra để so sánh
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (isPasswordCorrect) {
      res.status(200).json(user);
    } else {
      res.status(400).send("Sai password hoặc username");
    }
  } catch (err) {
    next(err);
  }
};
