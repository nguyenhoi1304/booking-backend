const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const hotelSchema = new Schema({
  name: { type: String, required: true, unique: true }, //Tên của khách sạn
  type: { type: String, required: true }, //Loại khách sạn (Hotel, Apartments, Resorts, Villas, Cabins)
  city: { type: String, required: true }, //Thành phố của khách sạn đó
  address: { type: String, required: true }, //Địa chỉ cụ thể của khách sạn
  distance: { type: Number, required: true }, //Khoảng cách từ khách sạn đến trung tâm thành phố
  photos: { type: [String] }, //Danh sách các link ảnh của khách sạn đó
  title: { type: String, required: true },
  desc: { type: String, required: true }, //Giới thiệu về khách sạn
  rating: { type: Number, min: 0, max: 5 }, //Đánh giá về khách sạn đó (trong khoảng 0 -> 5 điểm)
  featured: { type: Boolean, default: false }, //Khách sạn có hỗ trợ các tiện ích khác không
  rooms: [{ type: mongoose.Schema.ObjectId, ref: "Room" }], //Danh sách các phòng thuộc khách sạn này
  cheapestPrice: { type: Number, required: true },
});

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;
