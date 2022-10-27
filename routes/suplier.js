const express = require('express')
const SuplierModel = require('../models/SuplierModel')
const router = express.Router()


router.get('/drop', (req, res) => {
    SuplierModel.deleteMany({}, () => {
        console.log("Delete all data succeed !")
        res.redirect('/suplier')
    })
})




router.get('/', (req, res) => {
    SuplierModel.find((err, data) => {
        if (!err) {
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