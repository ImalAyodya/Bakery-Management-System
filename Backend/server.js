const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const route = require('./routes/saleroute'); // Ensure this is the correct path for your routes
const DailyDelivery = require('./models/salesdeliveryorders'); // Update the path as needed


const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(route); // Use your custom routes

// Route to add a daily delivery record
app.post('/api/dailydelivery', async (req, res) => {
  try {
    const dailyDelivery = new DailyDelivery(req.body);
    await dailyDelivery.save();
    res.status(201).json({
      success: true,
      message: 'Daily delivery record added successfully',
      data: dailyDelivery
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to add daily delivery record',
      error: error.message
    });
  }
});

// MongoDB connection
const PORT = 8001;
const DB_URL = 'mongodb+srv://malmi:malmi123@cluster0.3dgof.mongodb.net/OrderDB?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });

// Start server
const server = app.listen(PORT, () => {
  console.log(`Node server is listening on port ${PORT}`);
});
