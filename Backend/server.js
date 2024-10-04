/*"npm i mongoose" ekaii ithuru tika okkma terminal eka through install krnwaa*/ 

const mongoose = require('mongoose');
const route = require('./routes/saleroute'); // Ensure this is the correct path for your routes
const DailyDelivery = require('./models/salesdeliveryorders'); // Update the path as needed
const postRoutes = require('./routes/routes');
app.use(route); // Use your custom routes
const bodyParser = require('body-parser');
const cors = require('cors');
const dotebv = require('dotenv');
require('dotenv').config();
const app = express();
const port = 8000;
app.use(cors());
app.use(bodyParser.json());

const URL = "mongodb+srv://malmi:malmi123@cluster0.3dgof.mongodb.net/OrderDB?retryWrites=true&w=majority&appName=Cluster03';";

mongoose.connect(URL, {}).then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.log(err);
})


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
  
const routepath = require('./routes/customer');
app.use(routepath); 

const productRoutes = require('./routes/products.js');

app.use(postRoutes);

http://localhost:8000/products.

app.use('/products', productRoutes);

const productionRoutes = require('./routes/production.js');
app.use('/production', productionRoutes);

const postRoute = require('./route/deliveryroutes');
app.use(cors());

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})
