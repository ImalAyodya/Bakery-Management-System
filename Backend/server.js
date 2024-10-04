const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const postRoutes = require('./routes/routes');

//app middlewares
app.use(bodyParser.json());
app.use(cors());

app.use(postRoutes);

const PORT = 8000;
const DB_URL = 'mongodb+srv://pasan:pasan2003@inventory.03olvri.mongodb.net/?retryWrites=true&w=majority&appName=Inventory';

mongoose.connect(DB_URL)
.then(() => {
    console.log('Database Connected..'); 
})

.catch((error) => console.log('Database Connection Error..',error));


const server = app.listen(PORT, () => /*callback function*/{
    console.log(`node server is listening to ${PORT}`);
});

/*"npm i mongoose" ekaii ithuru tika okkma terminal eka through install krnwaa*/ 