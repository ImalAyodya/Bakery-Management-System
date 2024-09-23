const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const postRoute = require('./route/routes');
app.use(cors());

app.use(bodyParser.json());
app.use(postRoute)

const PORT = 8000;
//const DB_URL='mongodb+srv://dasuni:dasuni24@orderdelivery.cnttq.mongodb.net/?retryWrites=true&w=majority&appName=OrderDelivery';
//const DB_URL = 'mongodb+srv://malmi:malmi@123@cluster0.3dgof.mongodb.net/DeliveryDB?retryWrites=true&w=majority&appName=Cluster03';
//const DB_URL= 'mongodb+srv://malmi:malmi123@cluster0.3dgof.mongodb.net/DeliveryDB?retryWrites=true&w=majority&appName=Cluster0';
const DB_URL='mongodb+srv://malmi:malmi123@cluster0.3dgof.mongodb.net/OrderDB?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(DB_URL)
.then(()=>{
    console.log('database connected');
})

.catch((error)=> console.log('databse not connected..', error))
const server=app.listen(PORT,()=>
{
    console.log(`node server is listening to ${PORT}`);
});