const express = require('express');
const app = express();
const router = express.Router();
const Supplier = require('../models/Supplier');
const Cors = require('cors');

app.use(Cors());

router.post('/posts/save', async (req, res) =>{
    try{
        const {supplierTable} = req.body;
        const newPost = new Supplier({
            supplierTable
        })
        await newPost.save();
        return res.status(200).json({
            success: "Data added successfully",
            supplierTable : newPost
        });
    } catch(err){
        return res.status(400).json({
            error: err.message,
        });

    }
});

// read data

router.get("/posts",async(req, res)=>{
    try{
        const posts=await Supplier.find().exec();
        return res.status(200).json({
            success:true,
            supplier:posts

        });
    }catch(err){
        return res.status(400).json({
         error:err.message   
      });
    }

});

// update

router.put("/posts/update/:id", async (req, res) => {
    try {
        const updatedPost = await Supplier.findByIdAndUpdate(req.params.id, {$set: req.body }, {new: true});
        if (!updatedPost) {
            return res.status(404).json({
                error: "Post not found"
            });
        }
        return res.status(200).json({
            success: "Data update successfull",
            data: updatedPost
        });

    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

// delete

router.delete("/posts/delete/:id",async(req, res)=>{
    try{

        const deletePost = await Supplier.findByIdAndDelete(req.params.id).exec();

        if(!deletePost){
            return res.status(404).json({
                error:"Post not found"
            });
        }
        return res.status(200).json({
            success: "DData Delete successfully",
            data: deletePost
        });
    }catch(err){
        return res.status(400).json({
            error:err.message
        });
    }
});



module.exports = router;
