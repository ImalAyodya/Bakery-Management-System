const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser= require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const postRoute = require('./routes/Emproutes')
app.use(cors()); 

app.use(bodyParser.json());
app.use(postRoute)

const PORT = 8001;
//const DB_URL = 'mongodb+srv://kavisha:kavisha2002@employee.tgy9x.mongodb.net/?retryWrites=true&w=majority&appName=Employee'; 
const DB_URL ='mongodb+srv://malmi:malmi123@cluster0.3dgof.mongodb.net/OrderDB?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(DB_URL)
.then(()=>{
    console.log('Database Connected');
})

.catch((error)=> console.log('Database not connected',error));

const server = app.listen(PORT, ()=>{
    console.log(`node server is listening to ${PORT}`);
})
