require('dotenv').config();


const connectDB = require('./DB/Connect');
const Product = require("./models/products");

const jsonProducts = require("./products.json");


const start = async()=>{  
    try{
        await connectDB(process.env.MONGO_URI);
        await Product.deleteMany(); //delete before insertion
        await Product.create(jsonProducts);
        console.log("success");

    }catch(error){
        console.log(error);

    }
}

start()