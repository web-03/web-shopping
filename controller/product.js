var express = require('express');
var router = express.Router();
var con = require('./../config/key');
const product = require('./../model/product');
const category = require('./../model/category');
var productsAll = [];


var categoriesAll = [];
var count = -1;
const limit = 3;
var sumpage = -1;

/* GET home page. and get all product */
router.getIndex = (req, res, next) => {
  productsAll = [];
  categoriesAll = [];
  var from = req.query.from;
  var to = req.query.to;
  var index = req.query.page;
  if(index == undefined)
  {
    index = 1;
  }

  console.log(from);
  console.log(to);
  console.log(index);
  con.query('select count(id) as count  from products where status = 1',function(err,rows,fields){
    count = rows[0].count;
  
    sumpage = Math.ceil(count / limit);
    
  })
  con.query('select * from categories WHERE status = 1' , function (err, rows, fields) {
    if (err) throw err
  
    rows.forEach(element => {
      var x = new category(element.id, element.name, element.status, element.description);
      categoriesAll.push(x);
    })
  });
  if (from == undefined && to == undefined){
    
    con.query('select * from products WHERE status = 1 limit ?,?',[(index-1)*limit,limit], function (err, rows, fields) {
      if (err) throw err
    
      rows.forEach(element => {
        var x = new product(element.id, element.name, element.price,element.quantity, element.detail,element.id_category,element.image, element.status);
        productsAll.push(x);
      })
      
      res.render('product/product',{products : productsAll, categories : categoriesAll,user: req.user,count: sumpage});
    });
  }
  else if (from == undefined ){
    con.query('select count(id) as count  from products where status = 1 and price > '+to,function(err,rows,fields){
      count = rows[0].count;
    
      sumpage = Math.ceil(count / limit);
      
    })
    con.query('select * from products WHERE status = 1 and price > '+to +' limit ?,?',[(index-1)*limit,limit], function (err, rows, fields) {
      if (err) throw err
    
      rows.forEach(element => {
        var x = new product(element.id, element.name, element.price,element.quantity, element.detail,element.id_category,element.image, element.status);
        productsAll.push(x);
      })
      console.log("zz");
      console.log(sumpage);
      res.render('product/product',{products : productsAll, categories : categoriesAll,user: req.user,count: sumpage});
    });
  }
  else {
    con.query('select count(id) as count  from products where status = 1 and price >  '+from+' and price < '+to,function(err,rows,fields){
      count = rows[0].count;
    
      sumpage = Math.ceil(count / limit);
      
    })
    con.query('select * from products WHERE status = 1 and price >  '+from+' and price < '+to+' limit ?,?',[(index-1)*limit,limit], function (err, rows, fields) {
      if (err) throw err
    
      rows.forEach(element => {
        var x = new product(element.id, element.name, element.price,element.quantity, element.detail,element.id_category,element.image, element.status);
        productsAll.push(x);
      })
      res.render('product/product',{products : productsAll, categories : categoriesAll,user: req.user,count: sumpage});
    });
  }
  
};

router.getSearch = (req, res, next) => {
  productsAll = [];
  let name = req.query.name;
  console.log(name);
  
  if (name == undefined){
    con.query('select count(id) as count  from products where status = 1',function(err,rows,fields){
      count = rows[0].count;
    
      sumpage = Math.ceil(count / limit);
      
    })
    con.query('select * from products WHERE status = 1', function (err, rows, fields) {
      if (err) throw err
    
      rows.forEach(element => {
        var x = new product(element.id, element.name, element.price,element.quantity, element.detail,element.id_category,element.image, element.status);
        productsAll.push(x);
      })
      res.render('product/product',{products : productsAll, categories : categoriesAll,user: req.user,count: sumpage});
    });
  }
  else{
    con.query('select count(id) as count  from products where status = 1 and lower(name) like lower("%'+name+'%")',function(err,rows,fields){
      count = rows[0].count;
    
      sumpage = Math.ceil(count / limit);
      
    })
    con.query('select * from products WHERE status = 1 and lower(name) like lower("%'+name+'%")' , function (err, rows, fields) {
      if (err) throw err
    
      rows.forEach(element => {
        var x = new product(element.id, element.name, element.price,element.quantity, element.detail,element.id_category,element.image, element.status);
        productsAll.push(x);
      })
      res.render('product/product',{products : productsAll, categories : categoriesAll,user: req.user,count: sumpage});
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