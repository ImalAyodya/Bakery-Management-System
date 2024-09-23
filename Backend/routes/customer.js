const express=  require('express');
const router = express.Router();
const post= require('../models/Customer');
const cors = require('cors');
const mongoose = require('mongoose')



//create  data
router.post('/customer/save', async (req, res)=>{
    try{

        const{customer}= req.body;
        const newpost = new post({
            customer
        })

        await newpost.save();
        return res.status(200).json({
            success: "Data saved successfully"
        });

    } catch(err){
        return res.status(400).json({
            error: err.message
        }); 
    }
});
//read 
router.get("/posts", async (req, res) => {
    try{
        const posts = await post.find().exec();
        return res.status(200).json({
            success: "Data showing successfully",
            data: posts
        });
    } catch(err){
        return res.status(400).json({
            error: err.message
        });
    }
});




router.put("/posts/update/:id", async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const { Address } = req.body;
    const { Phone_number } = req.body;
    const { Email } = req.body;
    const { user_name } = req.body;
    const { password } = req.body;

    const objectId = new mongoose.Types.ObjectId(id);
    try{
        const updatedPost = await post.findOneAndUpdate(
            { _id: objectId },
            { 'customer.name': name, 'customer.Address':Address, 'customer.Phone_number':Phone_number, 'customer.Email': Email, 'customer.user_name': user_name, 'customer.password': password},
            { new: true } // Return the updated document
        )
    
        if (!updatedPost) {
            return res.status(404).json({ error: "Post not found" });
        }

        return res.status(200).json({
            success: true,
            updatedPost: updatedPost // Send the updated post data
        });
        

    }

        catch (err) {
            return res.status(400).json({
                error: err.message
            });
        }

})
//update
/*router.put("/posts/update/:id", async (req, res)=>{
    try{
        const updatedpost = await post.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        );

        if(!updatedpost){
            return res.status(404).json({
                error: "post not found"
            });
        }
        return res.status(200).json({
            success:"Data updated successfully",
            data: updatedpost
        });

    } catch(err){
        return res.status(400).json({

        });
    }
});*/
//delete
    router.delete("/posts/delete/:id",async(req, res)=>{
        try{

            const deleteOrder = await post.findByIdAndDelete(req.params.id).exec();

            if(!deleteOrder){
                return res.status(404).json({
                    error:"order not found"
                });
            }
            return res.status(200).json({
                success: "DData Delete successfully",
                data: deleteOrder
            });
        }catch(err){
            return res.status(400).json({
                error:err.message
            });
        }
    }) ;

    /*inquary create eka
    router.post('/customer/save', async (req, res)=>{
    try{

        const{customer}= req.body;
        const newpost = new post({
            customer
        })

        await newpost.save();
        return res.status(200).json({
            success: "Data saved successfully"
        });

    } catch(err){
        return res.status(400).json({
            error: err.message
        }); 
    }
});*/



module.exports=router;