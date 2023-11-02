const express = require("express");

const router = express.Router();
const UserController = require("../controllers/user");

//put
router.put("/:id", UserController.putUser);
//delete
router.delete("/:id", UserController.deleteUser);
//get
router.get("/:id", UserController.getUser);
//get all
router.get("/", UserController.getAllUser);

module.exports = router;
