const express = require('express')
const ProductModel = require('../models/ProductModel')
const router = express.Router()


router.get('/drop', (req, res) => {
    ProductModel.deleteMany({}, () => {
        console.log("Delete all data succeed !")
        res.redirect('/product')
    })
})



//URL: localhost:3000
router.get('/', (req, res) => {
    ProductModel.find((err, data) => {
        if (!err) {
            res.render('product/index', { product: data })
        }
    })
})

router.get('/list', (req, res) => {
    ProductModel.find((err, data) => {
        if (!err) {
            res.render('product/list', { product: data, })
        }
    })
})


router.get('/delete/:id', (req, res) => {
    ProductModel.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Delete product succeed !");
            res.redirect("/product");
        }
    })
})

//render ra form ADD
router.get('/add', (req, res) => {
    res.render("product/new");
})

//nhận & xử lý dữ liệu từ form ADD
router.post('/add', (req, res) => {
    ProductModel.create(req.body, (err) => {
        if (!err) {
            console.log('Add product succeed !')
            res.redirect("/product")
        }
    })
})

//render ra form EDIT
router.get('/edit/:id', (req, res) => {
    ProductModel.findById(req.params.id, (err, data) => {
        if (!err) {
            res.render("product/update", { product: data })
        }
    })
})

//nhận & xử lý dữ liệu từ form EDIT
router.post('/edit/:id', (req, res) => {
    var id = req.params.id;
    var product = req.body;
    ProductModel.findByIdAndUpdate(id, product, (err) => {
        if (!err) {
            console.log("Update product succeed !")
            res.redirect("/product")
        }
    })
})

router.get('/detail/:id', (req, res) => {
    ProductModel.findById(req.params.id, (err, product) => {
        if (!err) {
            res.render('product/info', { product: product })
        }
    })
})

//search function
router.post('/search', (req, res) => {
    ProductModel.find({ Name: new RegExp(req.body.Name, "i") }, (err, data) => {
        if (!err) {
            res.render('product/index', {product: data })
        }
    })
})
//sort function
router.get('/sort/asc', (req, res) => {
    ProductModel.find()
        .sort({ Name: 1 })
        .exec((err, data) => {
            if (!err) {
                res.render('product/index', {product: data })
            }
        })
})

router.get('/sort/desc', (req, res) => {
    ProductModel.find()
        .sort({ Name: -1 })
        .exec((err, data) => {
            if (!err) {
                res.render('product/index', { product: data })
            }
        })
})
module.exports = router