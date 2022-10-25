var express = require('express')
var router = express.Router()

//set trang chủ (homepage)
router.get('/', (req, res) => {
  //render ra trang index ở trong thư mục views
  res.render('index')
})

//about
router.get('/aboutus', (req, res) => {
  //render ra trang about us ở trong thư mục views
  res.render('aboutus')
})

//help
router.get('/help', (req, res) => {
  //render ra trang help ở trong thư mục views
  res.render('help')
})



module.exports = router
