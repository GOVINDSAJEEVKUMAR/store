const express = require("express");
const connectDB = require("./DB/Connect");
require("express-async-errors");
const route = require ("./Routes/products")


const app = express();
require("dotenv").config();
const notFoundMiddleware = require("./Middlewares/notFound");
const errorHandlerMiddleware = require("./Middlewares/error-handler");

app.use("/",route);




app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 8000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Connected to port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
