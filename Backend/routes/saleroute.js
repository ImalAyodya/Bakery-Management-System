//create data
const express = require('express');
const route = express.Router();
const Post = require('../models/targetplan');
const mongoose = require('mongoose');
//const wholesaleorders = require('../models/');
const wholesaleorders = require('../models/salesWholesaleorder');
const deliveryorders = require('../models/salesdeliveryorders');
const Production = require('../models/productiondetails'); // Update the path to your model file
const OnlineOrder = require('../models/onlineSales');


//create data
route.post('/saleplan/save', async (req, res) => {
    try {
        const{targetPlan} = req.body;
        const newPost = new Post({
            targetPlan
        });

        await newPost.save();

        return res.status(200).json({
            success:true

        });

    }

    catch(err){
        return res.status(400).json({
            error:err.message
        });

    }
});

//read data from target plan

route.get("/saleplan",async (req, res)=>{
    try { 
        const posts = await Post.find().exec();
        return res.status(200).json({
            success: true,
            mypost:posts
        });
    }catch(err){
        return res.status(400).json({
            error:err.message
        });
    }
});





//update data
{/** 
route.put("/posts/update/:id", async (req, res) => {
    try{
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        );

        if (!updatedPost){  
            return res.status(404).json({
                error:"Post not found"
            });
        }
        return res.status(200).json({
            success:"data updated successfully",
            data:updatedPost
        });
    }catch(err){
        return res.status(400).json({
            error:err.message
        });
    }
});
*/}
//update one field

route.put("/saleplan/update/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        const {date}=req.body;
        const {predictedQuantity}=req.body;
        const objectId = new mongoose.Types.ObjectId(id);
        const updatedPost=await Post.findByIdAndUpdate(
            {_id:objectId},
            {'targetPlan.date':date,'targetPlan.predictedQuantity':predictedQuantity},
            {new:true}
        );

        if (!updatedPost){
            return res.status(404).json({
                error:"post not found"
            });
        }

        return res.status(200).json({
            success:"date updated successfully",
            data:updatedPost
        });

    }catch(err){
        return res.status(400).json({
            error:err.message
        });

    }
});
//delete data

route.delete("/saleplan/delete/:id",async(req, res)=>{
    try{

        const deletePost =await Post.findByIdAndDelete(req.params.id).exec();
        if (!deletePost){
            return res.status(404).json({
                error:"post not found"
            });
        }
        return res.status(200).json({
            success:"data deleted successful",
            data:deletePost
        });
    }catch(err){
        return res.status(400).json({
            error:err.message
        });
    }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// read data from online orders

//read data route kiyene function eke thiye....get kiyene http request method eke.


// Read data from wholesale orders
route.get("/order", async (req, res) => {
    try {
        const posts = await wholesaleorders.find().exec(); // Use the correct model name
        return res.status(200).json({
            success: true,
            ReadData: posts       
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});



// Route to fetch all Production documents
route.get('/production', async (req, res) => {
    try {
        const productions = await Production.find();
        res.json({
            success: true,
            data: productions
        });
    } catch (error) {
        console.error('Error fetching production data:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

//PM path to their model
// Route to get all production details
route.get('/productions', async (req, res) => {
    try {
      const productions = await Production.find();
      res.status(200).json(productions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Route to add a new production detail
route.post('/productions', async (req, res) => {
    try {
      const production = new Production({
        productID: req.body.productID,
        date: req.body.date,
        unitCost: req.body.unitCost,
        productQuantity: req.body.productQuantity,
      });
  
      const savedProduction = await production.save();
      res.status(201).json(savedProduction);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Route to create a new online order
route.post('/onlineorder/create', async (req, res) => {
    try {
        const newOrder = new OnlineOrder(req.body);
        await newOrder.save();
        res.status(201).json({
            success: 'Order created successfully',
            data: newOrder
        });
    } catch (error) {
        console.error('Error creating online order:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

  // Route to fetch all online orders
route.get('/onlineorder', async (req, res) => {
    try {
        const orders = await OnlineOrder.find(); // Fetch all data from the OnlineOrder model
        res.json({
            success: 'Data showing successfully',
            data: orders
        });
    } catch (error) {
        console.error('Error fetching online orders:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// Route to add a new order
route.post('/orders', async (req, res) => {
    try {
        const order = new wholesaleorders({
            WholesaleOrder: {
                customerID: req.body.customerID,
                customerName: req.body.customerName,
                products: req.body.products,
                totalAmount: req.body.totalAmount,
                orderSchedule: req.body.orderSchedule,
                deliveryDate: req.body.deliveryDate,
                status: req.body.status
            }
        });
    
        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to fetch all daily deliveries
route.get('/post2', async (req, res) => {
    try {
        const deliveries = await deliveryorders.find(); // Fetch all data from the Daily model
        res.json({
            success: 'data showing successfully',
            data: deliveries
        });
    } catch (error) {
        console.error('Error fetching daily deliveries:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

 // Route to create a new daily delivery
route.post('/post2', async (req, res) => {
    try {
        const newDelivery = new deliveryorders(req.body);
        const savedDelivery = await newDelivery.save();
        res.status(201).json({
            success: true,
            message: 'Daily delivery created successfully',
            data: savedDelivery
        });
    } catch (error) {
        console.error('Error creating daily delivery:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});




module.exports = route;

