const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/inventory');
const sendStock = require('../models/SendStock');
const Order = require('../models/OrderRequest');
const Order = require('../models/postmethod');
const { default: mongoose } = require('mongoose');
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


router.delete("/sendstock/delete/:id", async (req, res) => {
    console.log("Delete request received for ID:", req.params.id);
        try {
        const deletedPost = await sendStock.findByIdAndDelete(req.params.id).exec();

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


router.delete("/supplierrequest/delete/:id", async (req, res) => {
    console.log("Delete request received for ID:", req.params.id);
        try {
        const deletedPost = await Order.findByIdAndDelete(req.params.id).exec();

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






/*router.route("/create").post((req,res)=>{  //array function, arow function
    const = req.body.
})  */  

//create data

router.post('/wholesaleOrder/create',async(req, res)=>{  //request and response 
    try{
        const{WholesaleOrder} = req.body; //body ekn reques kergnnva data.
        const newPost = new Order( 
            {
                WholesaleOrder
            }     //kamathi object ekk hadagnne,
            
        )
        await newPost.save();  //save kergnne kiela request ekk denva save function eke use kerela
        return res.status(200).json({            
            success: "Data Saved Successfully",   
            wholsesaleorderdetails:newPost     
        });

    }catch(err){
        return res.status(400).json({
            error: err.message
            
        });
    }
});

/*
router.post('/order/create', async (req, res) => {
    try {
      const { WholesaleOrder } = req.body;
      console.log('Received order data:', WholesaleOrder); // Log received data
      const newPost = new Order(WholesaleOrder);
      await newPost.save();
      return res.status(200).json({
        success: "Data Saved Successfully",
        wholsesaleorderdetails: newPost
      });
    } catch (err) {
      console.error('Error occurred during order creation:', err.message);
      return res.status(400).json({
        error: err.message
      });
    }
  });
  */


//read data      route kiyene function eke thiye....get kiyene http request method eke.
router.get("/wholesaleOrder", async(req, res)=>{
    try{
        const posts = await Order.find().exec();       //udeme declare kerpu Order name ekefetch all documents from the post collection in the MongoDB database.
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
router.put("/wholesaleOrder/update/:id",async(req, res)=>{
    try{
        const{ id } = req.params;
        const{ status } = req.body;
        const objectId = new mongoose.Types.ObjectId(id);
        const updatePost = await Order.findOneAndUpdate(
            {_id: objectId},  // The ID of the document to update
            {'WholesaleOrder.status':status},
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
router.delete("/wholesaleOrder/delete/:id",async(req, res)=>{
    try{
        
        //const deleteOrder =await Order.deleteMany({ "WholesaleOrder.status": "Cancelled" });
        const deleteOrder =await Order.findByIdAndDelete(req.params.id).exec();
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


//delete
/*router.delete("/order/status/:status",async(req, res)=>{
    try{
        
        //const deleteOrder =await Order.deleteMany({ "WholesaleOrder.status": "Cancelled" });
        const status = req.params.status;

        // Find all orders with the given status
        const orders = await Order.find({ "WholesaleOrder.status": status }).exec();
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
});*/

module.exports = router; //export the module
