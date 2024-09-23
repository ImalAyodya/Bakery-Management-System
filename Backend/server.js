const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();
const routepath = require('./routes/customer');


const app = express();

const port = 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(routepath); 

const url = "mongodb+srv://oshadhi:oshadhi123@customer.hp6hp.mongodb.net/CustomerDB?retryWrites=true&w=majority&appName=Customer"

mongoose.connect(url, {}).then(() => {
    console.log("MongoDB Connected");
}).catch((err) => {
    console.log(err);
})

app.listen(port, () => {
    console.log(`Server is a running on port ${port}`)
})