const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema({
  user: { type: String, required: true }, //Username của người đặt phòng
  hotel: { type: mongoose.Schema.ObjectId, ref: "Hotel" }, // _Id của khách sạn đã đặt
  room: [{ type: mongoose.Schema.ObjectId, ref: "Room" }], // Danh sách các phòng đã đặt
  dateStart: { type: String, required: true }, // Ngày nhận phòng
  dateEnd: { type: String, required: true }, // Ngày trả phòng
  price: { type: Number, required: true }, //Chi phí
  payment: { type: String, required: true }, //Hình thức thanh toán (Credit Card, Cash)
  status: { type: String, required: true }, //Tình trạng (Booked, Checkin, Checkout)
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
