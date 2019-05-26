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
    res.render('product/product-detail',{user: req.user});
  });
  
};

router.getDetail = (req, res, next) => {
  let id = req.params.id;
  let sql = 'select * from products where id = '+ id;
  console.log(sql);
  con.query(sql, function(err, results, fields){
    console.log(results[0]);
    var x = new product(results[0].id, results[0].name, results[0].price,results[0].quantity, results[0].detail,results[0].id_category,results[0].image, results[0].status);
    res.render('product/product-detail',{product : x,user: req.user});
    
  });
};

module.exports = router;
