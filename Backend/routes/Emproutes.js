// const express = require('express');
// const router = express.Router();
// const Post = require('../models/register');
// const Post2 = require('../models/TempPost');
// const Post3 = require('../models/SalaryPost');



// const mongoose = require('mongoose');


// //create data
// router.post('/register/create', async(req, res) => {
//     try{
      
//         const{employeeRegister} = req.body;
//         const newPost = new Post({
//             employeeRegister
//         })

//         await newPost.save();
//         return res.status(200).json({
//             successs: true,
//         });
//     }catch(err){
//         return res.status(400).json({
//             error:err.message
//         });
//     }

// });

// //Read Data
// router.get("/register", async (req,res) => {
//     try{
//         const posts = await Post.find().exec();
//         return res.status(200).json({
//             success:true,
//             mypost: posts
//         });
//     }catch (err){
//         return res.status(400).json({
//             error: err.message
//         });
//     }

// });

// //Update Data
// router.put("/register/update/:id", async (req,res) => {
//     try{
//         const { id } = req.params;
//         const{ Address } = req.body;
//         const{ PhoneNumber } = req.body;
//         const{ BasicSalary} = req.body;

//         const objectId = new mongoose.Types.ObjectId(id);
//         const updatedPost = await Post.findOneAndUpdate(
//             { _id: objectId},
//             {'employeeRegister.Address':Address, 'employeeRegister.PhoneNumber':PhoneNumber,'employeeRegister.BasicSalary':BasicSalary},
//             {new: true}

//         );
        

//         if(!updatedPost){
//             return res.status(404).json({
//                 error: "Post not found"
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             data: updatedPost
//         });
            
            
//         }catch (err){
//             return res.status(400).json({
//                 error: err.message
//             });
//         }
//     });

// //Delete Data
// router.delete("/register/delete/:id" , async(req, res)=>{
//     try{
//         const deletePost = await Post.findByIdAndDelete(req.params.id).exec();

//         if(!deletePost){
//             return res.status(404).json({
//                error:"posts not found"
//             });
//         }
//         return res.status(200).json({
//             success: true,
//             mydelete:deletePost
//         });

//     }catch(err){
//         return res.status(400).json({
//             error:err.message
//         });

//     }
       
//  });
   

// //Tempory create
// router.post('/TempPost/save', async(req, res) => {
//     try{
      
//         const{Tempory} = req.body;
//         const newPost2 = new Post2({
//             Tempory
//         })

//         await newPost2.save();
//         return res.status(200).json({
//             success: true,
//             tempory : newPost2

//         });
//     }catch(err){
//         return res.status(400).json({
//             error:err.message
//         });
//     }

// });

// //Tempory read
// router.get("/TempPost", async (req,res) => {
//     try{
//         const TempPost = await Post2.find().exec();
//         return res.status(200).json({
//             success:"Successfully retrieved",
//             Tempory: TempPost
//         });
//     }catch (err){
//         return res.status(400).json({
//             error: err.message
//         });
//     }

// });

// //Tempory update
// router.put("/TempPost/update/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { AssignedDate } = req.body;

//         // Update the nested field Tempory.AssignedDate
//         const updatedPost1 = await Post2.findByIdAndUpdate(
//             id,
//             { 'Tempory.AssignedDate': AssignedDate },
//             { new: true } // Return the updated document
//         );

//         if (!updatedPost1) {
//             return res.status(404).json({
//                 error: "Post not found"
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             data: updatedPost1
//         });
//     } catch (err) {
//         return res.status(400).json({
//             error: err.message
//         });
//     }
// });



// //Tempory delete
// router.delete("/TempPost/delete/:id" , async(req, res)=>{
//     try{
//         const deletePost2 = await Post2.findByIdAndDelete(req.params.id).exec();

//         if(!deletePost2){
//             return res.status(404).json({
//                error:"posts not found"
//             });
//         }
//         return res.status(200).json({
//             success: "successfully deleted",
//             mydelete:deletePost2
//         });

//     }catch(err){
//         return res.status(400).json({
//             error:err.message
//         });

//     }
       
//  });


//  //salary create

//  router.post('/SalaryPost/save', async(req, res) => {
//     try{
      
//         const{Salary} = req.body;
//         const newPost3 = new Post3({
//             Salary
//         })

//         await newPost3.save();
//         return res.status(200).json({
//             success: true,
//             salary : newPost3

//         });
//     }catch(err){
//         return res.status(400).json({
//             error:err.message
//         });
//     }

// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Post = require('../models/register');
const Post2 = require('../models/TempPost');
const Post3 = require('../models/SalaryPost');
const mongoose = require('mongoose');


//create data
router.post('/register/create', async(req, res) => {
    try{
      
        const{employeeRegister} = req.body;
        const newPost = new Post({
            employeeRegister
        })

        await newPost.save();
        return res.status(200).json({
            successs: true,
        });
    }catch(err){
        return res.status(400).json({
            error:err.message
        });
    }

});

//Read Data
router.get("/register", async (req,res) => {
    try{
        const posts = await Post.find().exec();
        return res.status(200).json({
            success:true,
            mypost: posts
        });
    }catch (err){
        return res.status(400).json({
            error: err.message
        });
    }

});

//Update Data
router.put("/register/update/:id", async (req,res) => {
    try{
        const { id } = req.params;
        const{ Address } = req.body;
        const{ PhoneNumber } = req.body;
        const{ BasicSalary} = req.body;

        const objectId = new mongoose.Types.ObjectId(id);
        const updatedPost = await Post.findOneAndUpdate(
            { _id: objectId},
            {'employeeRegister.Address':Address, 'employeeRegister.PhoneNumber':PhoneNumber,'employeeRegister.BasicSalary':BasicSalary},
            {new: true}

        );
        

        if(!updatedPost){
            return res.status(404).json({
                error: "Post not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: updatedPost
        });
            
            
        }catch (err){
            return res.status(400).json({
                error: err.message
            });
        }
    });

//Delete Data
router.delete("/register/delete/:id" , async(req, res)=>{
    try{
        const deletePost = await Post.findByIdAndDelete(req.params.id).exec();

        if(!deletePost){
            return res.status(404).json({
               error:"posts not found"
            });
        }
        return res.status(200).json({
            success: true,
            mydelete:deletePost
        });

    }catch(err){
        return res.status(400).json({
            error:err.message
        });

    }
       
 });

// Create Temporary Worker
router.post('/TempPost/save', async (req, res) => {
    try {
        const { Tempory } = req.body;
        const newPost2 = new Post2({
            Tempory
        });

        await newPost2.save();
        return res.status(200).json({
            success: true,
            tempory: newPost2
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

// Read Temporary Workers
router.get("/TempPost", async (req, res) => {
    try {
        const TempPost = await Post2.find().exec();
        return res.status(200).json({
            success: "Successfully retrieved",
            Tempory: TempPost
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

// Update Assigned Date
router.put("/TempPost/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { AssignedDate } = req.body;

        const updatedPost1 = await Post2.findByIdAndUpdate(
            id,
            { 'Tempory.AssignedDate': AssignedDate },
            { new: true }
        );

        if (!updatedPost1) {
            return res.status(404).json({
                error: "Post not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: updatedPost1
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

// Delete Temporary Worker
router.delete("/TempPost/delete/:id", async (req, res) => {
    try {
        const deletePost2 = await Post2.findByIdAndDelete(req.params.id).exec();

        if (!deletePost2) {
            return res.status(404).json({
                error: "Post not found"
            });
        }

        return res.status(200).json({
            success: "Successfully deleted",
            data: deletePost2
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

module.exports = router;
