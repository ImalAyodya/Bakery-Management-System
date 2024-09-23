const express=require('express');//express dagtta
const mongoose = require('mongoose');//mongose dagtta
const router=express.Router();//path hadagnna express eke router kyna eka gtta
const path = require('../models/post')//full post.js file eka varible ekata dagtta
const path2 = require('../models/post2')//full post.js file eka varible ekata dagtta
const Vehicle = require('../models/deliveryvehicle');
//create data
router.post('/deliveryorder/save', async(req,res)=>{
    try{
        const{OrderDelivery}=req.body;
        const newpost=new path({

            OrderDelivery


        })
        await newpost.save();
        return res.status(200).json({

            success:true,
            orderDelivery : newpost,
            message: "data added successfullyy.."
        });
    }
    catch(err){
        return res.status(400).json({
            error:err.message,
            message: "data added unsuccessfullyy.."
        });
    }


});


//Read Data
router.get("/deliveryorder",async(req,res)=>{
    try{
        const post=await path.find().exec();
        return res.status(200).json({
            success:true,
            mypost:post
        });
    }catch(err)
    {
        return res.status(400).json({
            error:err.message
        });
    }
    


});
//update eka 
/*router.put("/post/update/:id",async(req,res)=>{
    try{
        const updatedpost=await path.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new:true}

        );

        if(!updatedpost){
            return res.status(404).json({
                error:"post not found"
            });
        }
        return res.status(200).json({
            success:"data updated successfully",
            data:updatedpost
        });
    }catch(err){
        return res.status(400).json({
            error:err.message
        });
    }


});*/
//delete ekahh
router.delete("/deliveryorder/delete/:id",async(req,res)=>{
    try{
        const deleted=await path.findByIdAndDelete(req.params.id).exec();
        if(!deleted){
            return res.status(404).json({
                error:"not found"
            });
        }
        return res.status(200).json({
            success:true,
            data:deleted
        });
    }catch(err)
        {
            return res.status(200).json({
                error:err.message

        });
    }
    });
    //aluth update eka
    router.put("/deliveryorder/update/:id",async(req,res)=>{
        try{
            const{id}=req.params;
            const{diliverystatus}=req.body;
            const objectID= new mongoose.Types.ObjectId(id);
            const updatedpost=await path.findOneAndUpdate(
                {_id: objectID},
                {'OrderDelivery.diliverystatus':diliverystatus},
                {new:true}
                
          );
          if(!updatedpost){
            return res.status(404).json({
                error:"post not found"
            });
        }
        return res.status(200).json({
            success:"data updated successfully",
            data:updatedpost
        });
    }catch(err){
        return res.status(400).json({
            error:err.message
        });
    }


});
   //--------------------------------------------------------------
   //sheage page ekah
   //create data
router.post('/deliverysales/save', async(req,res)=>{
    try{
        const{dailydelivery}=req.body;
        const newpost2=new path2({

            dailydelivery


        })
        await newpost2.save();
        return res.status(200).json({

            success:"successfull",
        });
    }
    catch(err){
        return res.status(400).json({
            error:err.message
        });
    }


});
//read ekah
router.get('/deliverysales', async (req, res) => {
    try {
        const sales = await path2.find(); // Fetch all sales
        return res.status(200).json({
            success: true,
            sales,
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            error: err.message,
        });
    }
});
//---------------vehicle page full crud-------------------------
// Create data
// Create data
router.post('/deliveryvehicle/save', async (req, res) => {
    try {
        const { VehicleDriver } = req.body;
        const newVehicle = new Vehicle({
            VehicleDriver
        });
        await newVehicle.save();
        return res.status(200).json({
            success: true,
            vehicle: newVehicle,
            message: "Vehicle data added successfully."
        });
    } catch (err) {
        return res.status(400).json({
            message: "Failed to add vehicle data."
        });
    }
});

// Read data
router.get('/deliveryvehicle', async (req, res) => {
    try {
        const vehicles = await Vehicle.find().exec();
        return res.status(200).json({
            success: true,
            vehicles
        });
    } catch (err) {
    }
});

// Update data
router.put('/deliveryvehicle/update/:id', async (req, res) => {
    try {
        const updatedVehicle = await Vehicle.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedVehicle) {
            return res.status(404).json({
                error: "Vehicle not found."
            });
        }
        return res.status(200).json({
            success: true,
            message: "Vehicle data updated successfully.",
            data: updatedVehicle
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

 
// Delete data
router.delete('/deliveryvehicle/delete/:id', async (req, res) => {
    try {
        const deletedVehicle = await Vehicle.findByIdAndDelete(req.params.id).exec();
        if (!deletedVehicle) {
            return res.status(404).json({
                error: "Vehicle not found."
            });
        }
        return res.status(200).json({
            success: true,
            message: "Vehicle data deleted successfully.",
            data: deletedVehicle
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});


module.exports=router;