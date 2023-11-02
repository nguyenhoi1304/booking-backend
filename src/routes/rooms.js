const express = require("express");
const roomController = require("../controllers/room");
const router = express.Router();

router.post("/:roomId", roomController.createRoom);

//put
router.put("/:id", roomController.putRoom);
//delete
router.delete("/:id", roomController.deleteRoom);
//get
router.get("/:roomId", roomController.getRoom);
//get all
router.get("/", roomController.AllRoom);

module.exports = router;
