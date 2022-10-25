const express = require('express')
const SuplierModel = require('../models/SuplierModel')
const router = express.Router()


router.get('/drop', (req, res) => {
    SuplierModel.deleteMany({}, () => {
        console.log("Delete all data succeed !")
        res.redirect('/suplier')
    })
})



//URL: localhost:3000/student
router.get('/', (req, res) => {
    SuplierModel.find((err, data) => {
        if (!err) {
            //res.send(data)
            //render ra trang index ở thư mục views/student
            res.render('suplier/index', { suplier: data })
        }
    })
})

router.get('/list', (req, res) => {
    SuplierModel.find((err, data) => {
        if (!err) {
            res.render('suplier/list', { suplier: data, })
        }
    })
})


router.get('/delete/:id', (req, res) => {
    SuplierModel.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Delete suplier succeed !");
            //var message = "Delete student succeed !";
            //redirect về trang /student (URL không phải view)
            res.redirect("/suplier");
        }
    })
})

//render ra form ADD
router.get('/add', (req, res) => {

    res.render("suplier/new");
})

//nhận & xử lý dữ liệu từ form ADD
router.post('/add', (req, res) => {
    //Cách 1: dùng "save"
    // var student = new StudentModel(req.body)
    // student.save((err) => {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log("Add student succeed !")
    //         res.redirect("/student")
    //     }
    // })
    //Cách 2: dùng "create"
    SuplierModel.create(req.body, (err) => {
        if (!err) {
            console.log('Add suplier succeed !')
            res.redirect("/suplier")
        }
    })
})

//render ra form EDIT
router.get('/edit/:id', (req, res) => {
    SuplierModel.findById(req.params.id, (err, data) => {
        if (!err) {
            //render ra file: update.hbs (trong thư mục views/student)
            //gửi kèm dữ liệu của object student để load vào form edit
            //student (tên) , data (dữ liệu)
            res.render("suplier/update", { suplier: data })
        }
    })
})

//nhận & xử lý dữ liệu từ form EDIT
router.post('/edit/:id', (req, res) => {
    var id = req.params.id;
    var suplier = req.body;
    SuplierModel.findByIdAndUpdate(id,suplier, (err) => {
        if (!err) {
            console.log("Update suplier succeed !")
            res.redirect("/suplier")
        }
    })
})

router.get('/detail/:id', (req, res) => {
    SuplierModel.findById(req.params.id, (err, suplier) => {
        if (!err) {
            res.render('suplier/info', { suplier: suplier })
        }
    })
})

//search function
router.post('/search', (req, res) => {
    SuplierModel.find({ Name: new RegExp(req.body.Name, "i") }, (err, data) => {
        if (!err) {
            res.render('suplier/index', {suplier: data })
        }
    })
})
//sort function
router.get('/sort/asc', (req, res) => {
    SuplierModel.find()
        .sort({ Name: 1 })
        .exec((err, data) => {
            if (!err) {
                res.render('suplier/index', {suplier: data })
            }
        })
})

router.get('/sort/desc', (req, res) => {
    SuplierModel.find()
        .sort({ Name: -1 })
        .exec((err, data) => {
            if (!err) {
                res.render('suplier/index', {suplier: data })
            }
        })
})

module.exports = router