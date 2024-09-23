const mongoose = require ('mongoose');

const  inquirychema= new mongoose.Schema({
    inquiry:{
        Name:{
            type: String,
            required: true
        },
        Email:{
            type: String,
            required: true
        },
        Phone_Number:{
            type: Number,
            required: true
        },
        PreferredMethodOfResponse:{
            type: String,
            required: true
        },
        QuestionorConcerns:{
            type: String,
            required: true
        },
        
        
    }
});
module.exports=mongoose.model('inquiry',inquirychema);