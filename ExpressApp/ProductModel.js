var mongoose = require("mongoose");
var ProductsSchema = mongoose.Schema({
    Product_id : String,
    ProductName: String,
    CategoryName: String,
    Manufacturer: String,
    Price: Number
});

module.exports = mongoose.model("Products", ProductsSchema ,"Product" );