// const Product = require("../Models/product")
 
// const getAllProductsStatic = async (req, res, next) => {
//   // throw new Error("testing Async Errors");
//   const search = "ab";
//   const products = await Product.find({
//     name:{$regex: search, $options: "i"}
//   }).sort("name")
//   res.status(200).json({ products,nbHits:products.length });
// };
 
// const getAllProducts = async (req, res) => {
//   const {featured, company, name,sort,price} = req.query;
//   const queryObject = {};
//   if (featured) {
//     queryObject.featured = featured === "true" ? true:false;
//   }
//   if (company) {
//     queryObject.company = company;
//   }
//   if (name) {
//     queryObject.name = name;
//   }
//   if (price) {
//     queryObject.price = price;
//   }
//   if(sort){
//     queryObject.sort = sort;
//   }
//   console.log(queryObject);
//   console.log(sort);
 
//   const products = await Product.find({
//         // name :{$regex: name, $options: "i"},
//         // company:{$regex: company, $options: "i"},
//         // price:{$regex: price, $options: "i"}
 
 
//   }).sort(name);
 
//   res.status(200).json({ products,nbHits:products.length });
// };
 
// module.exports = {
//   getAllProducts,
//   getAllProductsStatic
// }
const Product = require("../models/products");
 
const getAllProductsStatic = async (req, res, next) => {
  try {

    const search = "ab";
    const products = await Product.find({ })
    .sort("name")
    .select("name price")
    .limit(10)
    .skip(2);

    res.status(200).json({ products, nbHits: products.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
 
const getAllProducts = async (req, res) => {
  try {
    const { featured, company, name, sort, price,select} = req.query;
    const queryObject = {};
 
    if (featured) {
      queryObject.featured = featured === "true";
    }
    if (company) {
      queryObject.company = company;
    }
    if (name) {
      queryObject.name = { $regex: name, $options: "i" };
    }
    if (price) {
      queryObject.price = price;
    }
 
// --------------sort--------------

    let output = Product.find(queryObject);
    if(sort){
      const sortedList =sort.split(",").join(" ");
  output = output.sort(sortedList);
} 

// -------------select-----------

//  const product = Product.find({}).select("name price");

if(select){
  const Selectfield = select.split(',').join(' ');
  output =output.select(Selectfield)
}


// ----------limit-----

// if(limit){
//   const Limititem = limit.slice( {});
//   output = output.limit(Limititem)
// }

// ----------skip---------

const page = Number(req.query.page);
const limit = Number(req.query.limit);
const skip = (page-1) *limit;

output = output.skip(skip).limit(limit);



const products = await output;
res.status(200).json({ products, nbHits: products.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
 
module.exports = {
  getAllProducts,
  getAllProductsStatic
};
