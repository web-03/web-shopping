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
var category = function(id, name, status, description){
  this.id = id;
  this.name = name;
  this.status = status;
  this.description = description;
}
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