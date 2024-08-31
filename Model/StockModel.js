const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    id:String,
    name:String,
    state:String,
    instock:Number,
    outstock:Number
})

const Stock = new mongoose.model('Stock',stockSchema);
module.exports = Stock;