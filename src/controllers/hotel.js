const Hotel = require("../models/Hotel");
const Room = require("../models/Room");
const TransactionModel = require("../models/Transaction");

//CREATE Hotel
exports.createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  console.log(newHotel);
  try {
    //tạo Hotel bằng dữ liệu người nhập và lưu lại
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

//UPDATE Hotel
exports.putHotel = async (req, res) => {
  try {
    // Tìm id và nội dung cần update
    const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json(updatedHotel);
  } catch {}
};

// Lấy toàn bộ khách sạn hiện có
exports.AllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

//DELETE Hotel
exports.deleteHotel = async (req, res) => {
  try {
    // xóa hotel dựa trên params id
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("hotels đã được xóa");
  } catch (err) {
    next(err);
  }
};

//GET Hotel by id
exports.getHotelByid = async (req, res, next) => {
  try {
    // lấy hotel dựa trên params id
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

//GET  Hotel cho trang home để hiển thị số giơis lượng hotel
exports.getHotels = async (req, res) => {
  const limitValue = req.query.limit;
  const featuredValue = req.query.featured;
  try {
    // lấy ra tất cả hotel
    const hotels = await Hotel.find({
      featured: featuredValue,
    }).limit(+limitValue);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

//GET  Hotel theo
// vị trí là thành phố mà người dùng muốn ở
// Trong khoảng thời gian đó khách sạn còn phòng trống
// Có đủ số phòng mong muốn
exports.getSearchHotels = async (req, res) => {
  const findCity = req.query.city;
  const findMin = req.query.min;
  const findMax = req.query.max;
  const numberPeople = req.query.people;
  const manyRoom = req.query.manyRoom;
  const dateStartBook = req.query.dateStartBook;

  try {
    //lấy ra các giao dịch của người dùng
    const allTransaction = await Transaction.find().populate("room");
    // lấy ra tất cả hotel theo tìm kiếm của người dùng
    const hotels = await Hotel.find({
      city: findCity,
      cheapestPrice: { $gt: +findMin | 1, $lt: +findMax || 999 },
    }).populate("rooms");

    console.log(hotels);
    if (allTransaction.length > 0) {
      // Biến lưu trữ các phòng đã  book
      const roomsTransaction = [];
      // lấy ra phòng đã được book vào ngày hôm đó
      allTransaction.map((item) => {
        if (item.status === "Booking" && item.dateStart !== dateStartBook) {
          item.room.map((room) => roomsTransaction.push(room));
        }
      });

      // lấy ra các hotel của khách sạn có đủ số người và số phòng và khách sạn đó còn phòng trống => còn các phòng khác ngoài các phòng đã được book
      const data = roomsTransaction.map((roomTransaction) => {
        return hotels.filter((hotel) => {
          if (hotel.rooms.length >= +manyRoom) {
            return hotel.rooms.some((room) => {
              return (
                room.maxPeople >= +numberPeople &&
                room.title !== roomTransaction.title
              );
            });
          }
        });
      });

      // do data trên trả về kiểu:  Xử lý [[{}]]  =>  [{}]
      const arrayData = [];
      data.map((item) => {
        item.map((hotel) => arrayData.push(hotel));
      });

      // xử lý mảng phần tử bị lặp trùng nhau
      const result = arrayData.filter(
        (item, index) => arrayData.indexOf(item) === index
      );

      res.json(result);
    } else {
      // lấy ra các hotels thỏa mãn yêu cầu
      const result = hotels.filter((hotel) => {
        if (hotel.rooms.length >= +manyRoom) {
          return hotel.rooms.some((room) => {
            return room.maxPeople >= +numberPeople;
          });
        }
      });
      console.log(result);
      res.json(result);
    }
  } catch (err) {
    console.log(err);
  }
};

/////////////  getHotels,ByCity, ByType/////

//Hiển thị hotel và phòng ở trang booking tương ứng
exports.HotelRooms = async (req, res, next) => {
  const hotelId = req.query.hotelId;
  const dateStartBook = req.query.dateStart;
  const dateEnd = req.query.dateEnd;
  const manyRoom = req.query.manyRoom;
  try {
    //lấy ra các giao dịch của người dùng
    const allTransaction = await Transaction.find().populate("room");

    //Lấy ra hotelsRoom đang chọn
    const hotelsRoom = await Hotel.findById(hotelId)
      .populate("rooms")
      .then((hotels) => hotels.rooms.splice(0, +manyRoom));

    if (allTransaction.length > 0) {
      // Biến lưu trữ các phòng đã  book
      const roomsTransaction = [];

      // lấy ra phòng đã được book vào ngày hôm đó
      allTransaction.map((item) => {
        if (item.status === "Booking" && item.dateStart !== dateStartBook) {
          item.room.map((room) => roomsTransaction.push(room));
        } else {
          res.json(hotelsRoom);
        }
      });

      const result = roomsTransaction.map((room) => {
        hotelsRoom.filter((item) => item.title !== room.title);
      });
      res.json(result);
    } else {
      res.json(hotelsRoom);
    }
  } catch (err) {
    console.log(err);
  }
};

// Đếm số lượng City theo thành phố
exports.countByCity = async (req, res, next) => {
  try {
    const countHaNoi = await Hotel.count({ city: "Ha Noi" });
    const countHoChiMinh = await Hotel.count({ city: "Ho Chi Minh" });
    const countDaNang = await Hotel.count({ city: "Da Nang" });
    const dataCountCity = [
      { city: "Ha Noi", countHaNoi },
      { city: "Ho Chi Minh", countHoChiMinh },
      { city: "Da Nang", countDaNang },
    ];
    res.status(200).json(dataCountCity);
  } catch (err) {
    console.log(err);
  }
};

// Đếm số lượng kiểu khách sạn
exports.ByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });
    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};
