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

con.query('select * from categories WHERE status = 1', function (err, rows, fields) {
  if (err) throw err

  rows.forEach(element => {
    var x = new category(element.id, element.name, element.status, element.description);
    categoriesAll.push(x);
  })
});

/* GET home page. and get all product */
router.getIndex = (req, res, next) => {
  productsAll = [];
  var from = req.query.from;
  var to = req.query.to;
  console.log(from);
  console.log(to);
  
  if (from == undefined && to == undefined){
    con.query('select * from products WHERE status = 1', function (err, rows, fields) {
      if (err) throw err
    
      rows.forEach(element => {
        var x = new product(element.id, element.name, element.price,element.quantity, element.detail,element.id_category,element.image, element.status);
        productsAll.push(x);
      })
      res.render('product/product',{products : productsAll, categories : categoriesAll});
    });
  }
  else if (from == undefined ){
    con.query('select * from products WHERE status = 1 and price > '+to , function (err, rows, fields) {
      if (err) throw err
    
      rows.forEach(element => {
        var x = new product(element.id, element.name, element.price,element.quantity, element.detail,element.id_category,element.image, element.status);
        productsAll.push(x);
      })
      res.render('product/product',{products : productsAll, categories : categoriesAll});
    });
  }
  else {
    con.query('select * from products WHERE status = 1 and price >  '+from+' and price < '+to, function (err, rows, fields) {
      if (err) throw err
    
      rows.forEach(element => {
        var x = new product(element.id, element.name, element.price,element.quantity, element.detail,element.id_category,element.image, element.status);
        productsAll.push(x);
      })
      res.render('product/product',{products : productsAll, categories : categoriesAll});
    });
  }
  
};

router.getSearch = (req, res, next) => {
  productsAll = [];
  let name = req.query.name;
  console.log(name);
  
  if (name == undefined){
    con.query('select * from products WHERE status = 1', function (err, rows, fields) {
      if (err) throw err
    
      rows.forEach(element => {
        var x = new product(element.id, element.name, element.price,element.quantity, element.detail,element.id_category,element.image, element.status);
        productsAll.push(x);
      })
      res.render('product/product',{products : productsAll, categories : categoriesAll});
    });
  }
  else{
    con.query('select * from products WHERE status = 1 and lower(name) like lower("%'+name+'%")' , function (err, rows, fields) {
      if (err) throw err
    
      rows.forEach(element => {
        var x = new product(element.id, element.name, element.price,element.quantity, element.detail,element.id_category,element.image, element.status);
        productsAll.push(x);
      })
      res.render('product/product',{products : productsAll, categories : categoriesAll});
    });
  }
  
};
//get detail product
router.getDetail = (req, res, next) => {
  let id = req.params.id;
  let sql = 'select * from products where id = '+ id;
  console.log(sql);
  con.query(sql, function(err, results, fields){
    console.log(results[0]);
    var x = new product(results[0].id, results[0].name, results[0].price,results[0].quantity, results[0].detail,results[0].id_category,results[0].image, results[0].status);
    res.render('product/product-detail',{product : x});
    
  });
};

module.exports = router;