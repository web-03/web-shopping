var express = require('express');
var router = express.Router();
var con = require('./../config/key');
const product = require('./../model/product');
const category = require('./../model/category');


var productsAll = [];

var categoriesAll = [];

/* GET home page. */
router.getIndex = (req, res, next) => {
  
  productsAll = [];
  categoriesAll = [];
  console.log(req.user);
  con.query('select * from categories where status = 1 ', function (err, rows, fields) {
    if (err) throw err
  
    rows.forEach(element => {
      var x = new category(element.id, element.name, element.status, element.description);
      categoriesAll.push(x);
    })
  });
  con.query('select * from products where status = 1 order by rand() limit 5', function (err, rows, fields) {
    if (err) throw err
  
    rows.forEach(element => {
      var x = new product(element.id, element.name, element.price,element.quantity, element.detail,element.id_category,element.image, element.status);
      productsAll.push(x);
    })
    res.render('home/index',{products : productsAll,categories : categoriesAll,user: req.user});
  });


  
};

module.exports = router;