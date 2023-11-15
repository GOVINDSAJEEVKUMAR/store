const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type :String,
        required :[true ,'Product Name Must provide'],
    },
    price:{
        type :Number ,
        required:[true,'provide price'],
    },
    featured:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:4.5,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    company:{
        type:String,
       enum:{
        values:['ikea','liddy','caressa','marcos'],
        // message: "{value} is not supportes"
       } 
    }
});
module.exports =mongoose.model("Product",productSchema)