const express = require("express");
const transactionController = require("../controllers/transaction");
const router = express.Router();

router.post("/", transactionController.postTransaction);
router.get("/", transactionController.Transaction);
router.post("/user", transactionController.postTransactionById);
router.get("/transaction-latest", transactionController.transactionlatest);

module.exports = router;
