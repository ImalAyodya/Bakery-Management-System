const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/posts');
const cors = require('cors');

app.use(cors());

//create data
router.post('/posts/save', async (req, res) => {
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

router.get('/posts', async (req, res) => {
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




//Update data
/*router.put("/posts/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { action, addQuantity } = req.body;
        const { reOrder } = req.body;

        // Convert id to ObjectId
        const objectId = new mongoose.Types.ObjectId(id);

        // Find and update the post
        const updatedPost = await Post.findOneAndUpdate(
            { _id: objectId },
            { 'inventory.addQuantity': addQuantity, 'inventory.reOrder': reOrder },
            { new: true } // Return the updated document
        );

        if (!updatedPost) {
            return res.status(404).json({ error: "Post not found" });
        }

        let currentQuantity = parseInt(updatedPost.inventory.addQuantity, 10);
        const newQuantity = parseInt(addQuantity, 10);

        if (action === 'add') {
            currentQuantity += newQuantity;
        } else if (action === 'remove') {
            currentQuantity -= newQuantity;
        }

        updatedPost.inventory.addQuantity = currentQuantity;
        updatedPost.inventory.reOrder = reOrder;

        // Save the updated post
        await updatedPost.save();

        // Return the updated post in the response
        return res.status(200).json({
            success: true,
            updatedPost: updatedPost // Send the updated post data
        });

    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});*/
router.put("/posts/update/:id", async (req, res) => {
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
router.delete("/posts/delete/:id", async (req, res) => {
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






module.exports = router;


// const express = require('express');
// const router = express.Router();
// const Post = require('../models/posts');

// http://localhost:8001/posts/save

// router.post('/save', async (req, res) => {
//     const post = new Post({
//         title: req.body.title,
//         description: req.body.description
//     });

//     try {
//         const savedPost = await post.save();
//         res.json(savedPost);
//     } catch (err) {
//         res.json({ message: err });
//     }
// });

// module.exports = router;

