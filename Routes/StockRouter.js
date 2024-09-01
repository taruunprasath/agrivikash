const express = require('express');
const router = express.Router();
const Stock = require('../Model/StockModel');
const { verifyToken } = require('../Middleware/Auth');

router.post('/stocks', verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const stock = new Stock({ ...req.body, userId });
        await stock.save();
        res.status(201).json(stock);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/stocks', verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const stocks = await Stock.find({ userId });
        res.status(200).json(stocks);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/stocks/:id', verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const stock = await Stock.findOneAndUpdate({ _id: req.params.id, userId }, req.body, { new: true });
        if (!stock) return res.status(404).json({ message: 'Stock not found or not authorized' });
        res.status(200).json(stock);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/stocks/:id', verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const result = await Stock.deleteOne({ _id: req.params.id, userId });
        if (result.deletedCount === 0) return res.status(404).json({ message: 'Stock not found or not authorized' });
        res.status(200).json({ message: 'Stock deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
