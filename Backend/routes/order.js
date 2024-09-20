const express = require('express');
const app = express();
const router = express.Router();
const Order = require('../models/Order');
const Cors = require('cors');

app.use(Cors());

router.post('/order/save', async (req, res) =>{
    try{
        const {orderTable} = req.body;
        const newPost = new Order({
            orderTable
        })
        await newPost.save();
        return res.status(200).json({
            success: true,
            orderTable : newPost
        });
    } catch(err){
        return res.status(400).json({
            error: err.message,
        });

    }
});

// read data

router.get("/posts/order",async(req, res)=>{
    try{
        const posts=await Order.find().exec();
        return res.status(200).json({
            success:true,
            order:posts

        });
    }catch(err){
        return res.status(400).json({
         error:err.message   
      });
    }

});

module.exports = router;
