const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const User = require("./src/models/User");
const authRoutes = require("./src/routes/auth");
const usersRoutes = require("./src/routes/users");
const hotelsRoutes = require("./src/routes/hotels");
const roomsRoutes = require("./src/routes/rooms");
const transactionRoutes = require("./src/routes/transaction");
const bcrypt = require("bcryptjs");

dotenv.config();

const PORT = process.env.PORT || 3030;
const app = express();

app.use(cors()); // cho phép mọi url đều lấy được tài nguyên localhost của mình

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// Middlewares

// bodyParser.json() : Nhận req.body từ phía client gửi lên
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/hotels", hotelsRoutes);
app.use("/api/rooms", roomsRoutes);
app.use("/api/transaction", transactionRoutes);

mongoose
  .connect(
    "mongodb+srv://nguyenhoi13041999:auybvyiHjcpRMayS@asm2.jmzt8dx.mongodb.net/"
  )
  .then((result) => {
    User.findOne().then((user) => {
      // nếu mà chưa có user và không có email admin thì tạo mặc định cho admin 1 tài khoản
      if (!user) {
        const hash = bcrypt.hashSync("123123123");
        User.create({
          username: "nguyenhoi",
          email: "nguyenhoi13041999@gmail.com",
          password: hash,
          isAdmin: true,
        });
      }
    });
    console.log("Connect Db Success");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
