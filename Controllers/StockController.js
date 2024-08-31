const Stock = require('../Model/StockModel');
const { v4: uuidv4 } = require('uuid');


exports.getStock = async (req, res) => {
    try {
        const stocks = await Stock.find();
        res.send(stocks);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to retrieve stocks" });
    }
};


exports.createStock = async (req, res) => {
    try {
        const { name, state, instock, outstock } = req.body;
        console.log("Request body: ", req.body);

        const stock = new Stock({
            id: uuidv4(),
            name,
            state,
            instock,
            outstock
        });

        await stock.save();
        res.status(200).json("Stock Created Successfully");
    } catch (err) {
        console.log(err);
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

        res.status(200).json("Stock Updated Successfully");
    } catch (err) {
        console.log(err);
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

        res.status(200).json("Stock Deleted Successfully");
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to delete stock" });
    }
};
