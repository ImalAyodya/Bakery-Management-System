const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
    orderTable:{
        companyName: {
            type:String,
            required: true
        },
        date: {
            type:String,
            required: true
        },
        productCategories:{
            type: String,
            required: true
        },
        quantity:{
            type: String,
            required: true
        },
    }
});

const Order = mongoose.model('order', OrderSchema);
module.exports = Order;