const StockController = require('../Controllers/StockController');
const express = require('express');
const router = express.Router();
const auth = require('../Middleware/Auth');

router.get("/",auth,StockController.getStock);
router.post("/",auth,StockController.createStock);
router.put("/",auth,StockController.updateStock);
router.delete("/:id",auth,StockController.deleteStock);

module.exports = router;