const express = require('express')
const StaffModel = require('../models/StaffModel')
const router = express.Router()


router.get('/drop', (req, res) => {
    StaffModel.deleteMany({}, () => {
        console.log("Delete all data succeed !")
        res.redirect('/staff')
    })
})



//URL: localhost:3000
router.get('/', (req, res) => {
    StaffModel.find((err, data) => {
        if (!err) {
            res.render('staff/index', { staff: data })
        }
    })
})

router.get('/list', (req, res) => {
    StaffModel.find((err, data) => {
        if (!err) {
            res.render('staff/list', { staff: data, })
        }
    })
})


router.get('/delete/:id', (req, res) => {
    StaffModel.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Delete staff succeed !");
            res.redirect("/staff");
        }
    })
})

//render ra form ADD
router.get('/add', (req, res) => {

    res.render("staff/new");
})

//nhận & xử lý dữ liệu từ form ADD
router.post('/add', (req, res) => {
    //Cách 1: dùng "save"
    // var staff = new StaffModel(req.body)
    // staff.save((err) => {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log("Add staff succeed !")
    //         res.redirect("/staff")
    //     }
    // })
    //Cách 2: dùng "create"
    StaffModel.create(req.body, (err) => {
        if (!err) {
            console.log('Add staff succeed !')
            res.redirect("/staff")
        }
    })
})

//render ra form EDIT
router.get('/edit/:id', (req, res) => {
    StaffModel.findById(req.params.id, (err, data) => {
        if (!err) {
            res.render("staff/update", { staff: data })
        }
    })
})

//nhận & xử lý dữ liệu từ form EDIT
router.post('/edit/:id', (req, res) => {
    var id = req.params.id;
    var staff = req.body;
    StaffModel.findByIdAndUpdate(id, staff, (err) => {
        if (!err) {
            console.log("Update staff succeed !")
            res.redirect("/staff")
        }
    })
})

router.get('/detail/:id', (req, res) => {
    StaffModel.findById(req.params.id, (err, staff) => {
        if (!err) {
            res.render('staff/info', { staff: staff })
        }
    })
})

//search function
router.post('/search', (req, res) => {
    StaffModel.find({ Name: new RegExp(req.body.Name, "i") }, (err, data) => {
        if (!err) {
            res.render('staff/index', { staff: data })
        }
    })
})
//sort function
router.get('/sort/asc', (req, res) => {
    StaffModel.find()
        .sort({ Name: 1 })
        .exec((err, data) => {
            if (!err) {
                res.render('staff/index', { staff: data })
            }
        })
})

router.get('/sort/desc', (req, res) => {
    StaffModel.find()
        .sort({ Name: -1 })
        .exec((err, data) => {
            if (!err) {
                res.render('staff/index', { staff: data })
            }
        })
})
module.exports = router