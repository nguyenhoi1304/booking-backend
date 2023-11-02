const express = require("express");

const router = express.Router();
const hotelController = require("../controllers/hotel");

//create
router.post("/", hotelController.createHotel);
//put
router.put("/:id", hotelController.putHotel);
router.get("/allhotel", hotelController.AllHotels);
router.delete("/find/:id", hotelController.deleteHotel);

router.get("/", hotelController.getHotels);
router.get("/searchHotels", hotelController.getSearchHotels);
router.get("/countByCitys", hotelController.countByCity);
router.get("/countByType", hotelController.ByType);
router.get("/room", hotelController.HotelRooms);
router.get("/find/:id", hotelController.getHotelByid);

module.exports = router;
