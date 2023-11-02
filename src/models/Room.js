const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const roomSchema = new Schema({
  title: { type: String, required: true }, //Tên loại phòng
  price: { type: Number, required: true }, // Mức giá của loại phòng đó (tính theo ngày)
  maxPeople: { type: Number, required: true }, //Số người tối đa
  desc: { type: String, required: true }, //Mô tả về loại phòng
  roomNumbers: [{ type: Number }], //Danh sách số phòng của loại phòng này
});
const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
