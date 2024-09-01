const Stock = require('../Model/StockModel');

exports.getStocksForUser = async (req, res) => {
  try {
    const userId = req.userId;
    const stocks = await Stock.find({ userId: userId });
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stocks', error: error.message });
  }
};

exports.createStock = async (req, res) => {
  try {
    const userId = req.userId;
    const newStock = new Stock({
      ...req.body,
      userId: userId,
    });
    const savedStock = await newStock.save();
    res.status(201).json(savedStock);
  } catch (error) {
    res.status(500).json({ message: 'Error creating stock', error: error.message });
  }
};

exports.updateStock = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const updatedStock = await Stock.findOneAndUpdate(
      { _id: id, userId: userId },
      req.body,
      { new: true }
    );
    if (!updatedStock) {
      return res.status(404).json({ message: 'Stock not found or unauthorized' });
    }
    res.json(updatedStock);
  } catch (error) {
    res.status(500).json({ message: 'Error updating stock', error: error.message });
  }
};

exports.deleteStock = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const deletedStock = await Stock.findOneAndDelete({ _id: id, userId: userId });
    if (!deletedStock) {
      return res.status(404).json({ message: 'Stock not found or unauthorized' });
    }
    res.json({ message: 'Stock deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting stock', error: error.message });
  }
};
