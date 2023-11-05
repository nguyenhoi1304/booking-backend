const TransactionModel = require("../models/Transaction");
const UserModel = require("../models/User");
const RoomModel = require("../models/Room");
const HotelModel = require("../models/Hotel");

//Lấy tất cả giao dich
exports.Transaction = async (req, res, next) => {
  const Transactions = await TransactionModel.find()
    .populate("hotel")
    .populate("room");
  res.json(Transactions);
};

exports.postTransaction = async (req, res, next) => {
  //nhận vào các thông tin người nhập khi chọn
  const { user, hotel, room, dateStart, dateEnd, price, payment, status } =
    req.body;

  const data = {
    user: user,
    hotel: hotel,
    room: room,
    dateStart: dateStart,
    dateEnd: dateEnd,
    price: +price,
    payment: payment,
    status: status,
  };

  const newTransaction = await TransactionModel.create(data);
  const result = await newTransaction.save();
  res.json(result);
};

exports.postTransactionById = async (req, res, next) => {
  try {
    // nhận tên người dùng đang đăng nhập từ client
    const userLogin = req.body.user;
    //lấy ra danh sách hiển thị đầy đủ thông tin người tạo giao dịch
    const dataTransactions = await TransactionModel.find({
      user: userLogin,
    })
      .populate("hotel")
      .populate("room");

    res.json(dataTransactions);
  } catch (err) {
    next(err);
    return;
  }
};

exports.transactionlatest = async (req, res, next) => {
  try {
    const dataTransactions = await TransactionModel.find()
      .populate("hotel")
      .populate("room");
    //Lấy ra 8 giao dịch gần nhất
    const transactionlatest = dataTransactions.slice(0, 9);
    res.json(transactionlatest);
  } catch (err) {
    next(err);
    return;
  }
};
