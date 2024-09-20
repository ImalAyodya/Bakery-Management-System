const express = require('express');
const router = express.Router();
const onlineOrder = require('../Models/postmethodOnline');
const { default: mongoose } = require('mongoose');

router.post('/onlineorder/create',async(req, res)=>{  //request and response 
    try{
        const{OnlineOrder} = req.body; //body ekn reques kergnnva data.
        const newPost = new onlineOrder( 
            {
                OnlineOrder
            }     //kamathi object ekk hadagnne,
            
        )
        await newPost.save();  //save kergnne kiela request ekk denva save function eke use kerela
        return res.status(200).json({            
            success: "Data Saved Successfully",   
            Onlineorderdetails:newPost     
        });

    }catch(err){
        return res.status(400).json({
            error: err.message
            
        });
    }
});

router.get("/onlineorder", async(req, res)=>{
    try{
        const posts = await onlineOrder.find().exec();       //udeme declare kerpu Order name ekefetch all documents from the post collection in the MongoDB database.
        return res.status(200).json({            
            success: true,
            ReadData:posts       
        });
    }catch(err){
        return res.status(400).json({
            error: err.message
            
        });
    }

});

//update data
router.put("/onlineorder/update/:id",async(req, res)=>{
    try{
        const{ id } = req.params;
        const{ status } = req.body;
        const objectId = new mongoose.Types.ObjectId(id);
        const updatePost = await onlineOrder.findOneAndUpdate(
            {_id: objectId},  // The ID of the document to update
            {'OnlineOrder.status':status},
            { new: true }
        );

        if(!updatePost){
            return res.status(404).json({
                error: "Order not found"
            });
        }
            return res.status(200).json({
                success: "Data Updated Successfully",
                data:updatePost 
            });
    }catch(err){
        return res.status(400).json({
            error: err.message
            
        });

    }
});

//delete
router.delete("/onlineorder/delete/:id",async(req, res)=>{
    try{
        
        //const deleteOrder =await Order.deleteMany({ "WholesaleOrder.status": "Cancelled" });
        const deleteOrder =await onlineOrder.findByIdAndDelete(req.params.id).exec();      //change
        if(!deleteOrder){
            return res.status(404).json({
                error: "Order not found"
            });
        }
        return res.status(200).json({
            success: "Data Deleted Successfully",
            data:deleteOrder
        });
    }catch(err){
        return res.status(400).json({
            error: err.message
            
        });

    }
});



module.exports = router;
