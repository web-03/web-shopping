var express = require('express');
var router = express.Router();
var con = require('./../config/key');
const product = require('./../model/product');
const category = require('./../model/category');


var productsAll = [];

var categoriesAll = [];
con.query('select * from categories', function (err, rows, fields) {
  if (err) throw err

  rows.forEach(element => {
    var x = new category(element.id, element.name, element.status, element.description);
    categoriesAll.push(x);
  })
});
con.query('select * from products', function (err, rows, fields) {
  if (err) throw err

  rows.forEach(element => {
    var x = new product(element.id, element.name, element.price,element.quantity, element.detail,element.id_category,element.image, element.status);
    productsAll.push(x);
  })
  
});
/* GET home page. */
router.getIndex = (req, res, next) => {
  console.log(req.user);
 
  res.render('home/index',{products : productsAll,categories : categoriesAll,user: req.user});
};

module.exports = router;