const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotebv = require('dotenv');
require('dotenv').config();

const app = express();

const port = 5080;

app.use(cors());
app.use(bodyParser.json());

// const URL = "mongodb+srv://Ayodya:Ayodya@cluster0.csn4fag.mongodb.net/ProductDB?retryWrites=true&w=majority&appName=Cluster0";
const URL = "mongodb+srv://malmi:malmi123@cluster0.3dgof.mongodb.net/ProductDB?retryWrites=true&w=majority&appName=Cluster03';";

mongoose.connect(URL, {}).then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.log(err);
})

const productRoutes = require('./routes/products.js');

http://localhost:5080/products.

app.use('/products', productRoutes);

const productionRoutes = require('./routes/production.js');
app.use('/production', productionRoutes);

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})