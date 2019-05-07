var express = require('express');
var router = express.Router();
var con = require('./../config/key');

var product = function(id, name,price,quantity, description, categoryId,image, status){
  this.id = id;
  this.name = name;
  this.price = price;
  this.quantity = quantity;
  this.description = description;
  this.categoryId = categoryId;
  this.image = image;
  this.status = status;
}
var productsAll = [];



/* GET home page. */
router.getIndex = (req, res, next) => {
  productsAll = [];
  con.query('select * from products', function (err, rows, fields) {
    if (err) throw err
  
    rows.forEach(element => {
      var x = new product(element.id, element.name, element.price,element.quantity, element.detail,element.id_category,element.image, element.status);
      productsAll.push(x);
    })
    res.render('product/product-detail');
  });
  
};

module.exports = router;
