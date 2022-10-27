const mongoose = require('mongoose')

var ProductSchema = new mongoose.Schema({
    Name: String,
    Size: Number,
    Image: String,
    Price: Number,
    Status: String,
    Suplier: String,
    Color: String
}, {
    versionKey: false //optional (to remove _v: 0 when add new data)
})
var ProductModel = mongoose.model('San Pham', ProductSchema, 'product')
module.exports = ProductModel