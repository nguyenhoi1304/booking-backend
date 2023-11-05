const Room = require("../models/Room");
const Hotel = require("../models/Hotel");

//Create Room
exports.createRoom = async (req, res, next) => {
  const roomId = req.params.roomId;

  const newRoom = await Room.create(req.body);
  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(roomId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch {}
};

//UPDATE Room
exports.putRoom = async (req, res, next) => {
  try {
    // Tìm id và nội dung cần update
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

//DELETE Room
exports.deleteRoom = async (req, res, next) => {
  try {
    await Room.findByIdAndDelete(req.params.id);

    res.status(200).json("Room đã được xóa");
  } catch (err) {
    next(err);
  }
};

//GET Room
exports.getRoom = async (req, res, next) => {
  try {
    // lấy Room dựa trên params id
    const rooms = await Room.findById(req.params.roomId);
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

//GET All Room
exports.AllRoom = async (req, res, next) => {
  try {
    // lấy ra tất cả Room
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
