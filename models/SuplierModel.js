const mongoose = require('mongoose')

var SuplierSchema = new mongoose.Schema({
    Name: String,
    Address: String,
    Email: String,
    Contact: String
}, {
    versionKey: false //optional (to remove _v: 0 when add new data)
})
var SuplierModel = mongoose.model('nha cung cap', SuplierSchema, 'suplier')
module.exports = SuplierModel