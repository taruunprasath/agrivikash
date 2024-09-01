const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    name: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    instock: {
        type: Number,
        required: true
    },
    outstock: {
        type: Number,
        required: true
    }
});

const Stock = mongoose.model('Stock', stockSchema);
module.exports = Stock;
