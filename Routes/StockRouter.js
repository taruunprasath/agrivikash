const StockController = require('../Controllers/StockController');
const express = require('express');
const router = express.Router();
// const auth = require('../Middleware/Auth');

router.get("/",StockController.getStock);
router.post("/",StockController.createStock);
router.put("/",StockController.updateStock);
router.delete("/",StockController.deleteStock);

module.exports = router;