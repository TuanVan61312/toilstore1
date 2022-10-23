const mongoose = require("mongoose")

var StudentSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    Gender: String,
    Image: String,
    Date: Date,
    Year: Number,
    Grade: Number,
    graduated: Boolean //true or false
}, {
    versionKey: false //optional (to remove _v: 0 when add new data)
})

var StudentModel = mongoose.model('Sinh Vien', StudentSchema, 'student')
module.exports = StudentModel