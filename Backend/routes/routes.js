const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/inventory');
const sendStock = require('../models/SendStock');
const Order = require('../models/OrderRequest');
const cors = require('cors');

app.use(cors());

//create data
router.post('/inventory/save', async (req, res) => {
    try {

        const{inventory} = req.body;
        const newPost = new Post({
            inventory
        })
        await newPost.save();
        return res.status(200).json({
            success: "Data saved successfully",
            inventory: newPost
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});



//Read Data

router.get('/inventory', async (req, res) => {
    try {
        const posts = await Post.find().exec();
        return res.status(200).json({
            success: true,/*success message ekk thbbee klin*/
            existingPosts: posts
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});


router.put("/inventory/update/:id", async (req, res) => {
    const { id } = req.params;
    const { addQuantity } = req.body;

    console.log("Update request received for ID:", req.params.id);
    const objectId = new mongoose.Types.ObjectId(id);
    try{
        const updatedPost = await Post.findOneAndUpdate(
            { _id: objectId },
            { 'inventory.addQuantity': addQuantity },
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








//delete data
router.delete("/inventory/delete/:id", async (req, res) => {
    console.log("Delete request received for ID:", req.params.id);
        try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id).exec();

        if (!deletedPost) {
            return res.status(404).json({
                error: "Post not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Data deleted successfully",
            data: deletedPost
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});




/*--------------Send Stock Create and Read Section-------------------*/

router.post('/sendstock/save', async (req, res) => {
    try {

        const{stock} = req.body;
        const newPost = new sendStock({
            stock
        })
        await newPost.save();
        return res.status(200).json({
            success: "Data saved successfully",
            stock: newPost
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});


router.get('/sendstock', async (req, res) => {
    try {
        const posts = await sendStock.find().exec();
        return res.status(200).json({
            success: true,/*success message ekk thbbee klin*/
            existingPosts: posts
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});


/*---------------Order Request Create and Read Section-------------------*/

router.post('/supplierrequest/save', async (req, res) => {
    try {

        const{order} = req.body;
        const newPost = new Order({
            order
        })
        await newPost.save();
        return res.status(200).json({
            success: "Data saved successfully",
            order: newPost
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});


router.get('/supplierrequest', async (req, res) => {
    try {
        const posts = await Order.find().exec();
        return res.status(200).json({
            success: true,/*success message ekk thbbee klin*/
            existingPosts: posts
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});


module.exports = router;


