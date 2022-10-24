const mongoose = require("mongoose")

var StaffSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    Gender: String,
    Image: String,
    Date: Date,
}, {
    versionKey: false //optional (to remove _v: 0 when add new data)
})

var StaffModel = mongoose.model('Nhan Vien', StaffSchema, 'staff')
module.exports = StaffModel