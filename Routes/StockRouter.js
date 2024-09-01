const StockController = require('../Controllers/StockController');
const express = require('express');
const router = express.Router();
const auth = require('../Middleware/Auth');

router.get("/", auth, StockController.getStocksForUser);
router.post("/", auth, StockController.createStock);
router.put("/:id", auth, StockController.updateStock);
router.delete("/:id", auth, StockController.deleteStock);

module.exports = router;
