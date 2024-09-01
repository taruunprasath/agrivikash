const Stock = require('../Model/StockModel');

exports.getStock = async (req, res) => {
    try {
        const stocks = await Stock.find();
        res.status(200).json(stocks);
    } catch (err) {
        console.error('Error retrieving stocks:', err.message);
        res.status(500).json({ error: "Failed to retrieve stocks" });
    }
};

exports.createStock = async (req, res) => {
    try {
        const { name, state, instock, outstock } = req.body;
        const stock = new Stock({
            name,
            state,
            instock,
            outstock
        });

        await stock.save();
        res.status(201).json({ message: "Stock Created Successfully", stock });
    } catch (err) {
        console.error('Error creating stock:', err.message);
        res.status(500).json({ error: "Failed to create stock" });
    }
};

exports.updateStock = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, state, instock, outstock } = req.body;

        const updatedStock = await Stock.findByIdAndUpdate(
            id,
            { name, state, instock, outstock },
            { new: true }
        );

        if (!updatedStock) {
            return res.status(404).json({ error: "Stock not found" });
        }

        res.status(200).json({ message: "Stock Updated Successfully", updatedStock });
    } catch (err) {
        console.error('Error updating stock:', err.message);
        res.status(500).json({ error: "Failed to update stock" });
    }
};

exports.deleteStock = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedStock = await Stock.findByIdAndDelete(id);

        if (!deletedStock) {
            return res.status(404).json({ error: "Stock not found" });
        }

        res.status(200).json({ message: "Stock Deleted Successfully", deletedStock });
    } catch (err) {
        console.error('Error deleting stock:', err.message);
        res.status(500).json({ error: "Failed to delete stock" });
    }
};
