const express = require('express');
const app = express();
const mongoose = require('mongoose');
const stockRoutes = require('../backend/Routes/StockRouter');
const userRoutes = require('../backend/Routes/UserRouter');
const cors = require('cors');   

mongoose.connect('mongodb+srv://taruunprasathgs2022eee:K83QmHmXHzs2DfJI@cluster-taruun.skzkrkf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-Taruun/agrivikash').then(()=>{
    console.log("Connected successfully");
})
app.use(express.json());
app.use(cors());

app.use('/stocks',stockRoutes);
app.use('/user',userRoutes);

app.listen(3000,()=>{
    console.log("Server is running");
})