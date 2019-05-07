var express = require('express');
var router = express.Router();
var con = require('./../config/key');
var router = express.Router();

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
/* GET home page. */
router.list = (req, res, next) => {
  let categories = [];
  categories = categoriesAll;
  res.render('category/index',{categories : categories});
};

router.create = (req, res, next) => {
  let name = req.body.name;
  let status = 1;
  let id = req.body.id;
  if(id==""){
    id=0;
  }
  let description = req.body.description;
  console.log(id);
  console.log(name);
  if(id == 0){
    let sql='INSERT INTO categories(name, status, description) VALUES ("'+name+'",'+status+',"'+description+'")';
    con.query(sql);
  }
  else{
    let sql = 'UPDATE categories SET name="'+name+'", status='+status+',description="'+description+'" WHERE id='+id;
    con.query(sql)
  }
  categoriesAll = [];
  con.query('select * from categories', function (err, rows, fields) {
    if (err) throw err

    rows.forEach(element => {
      var x = new category(element.id, element.name, element.status, element.description);
      categoriesAll.push(x);
    })
  });
  res.redirect('/gian-hang');
};

router.changeStatus = (req, res, next) => {
  let id= req.params.id;
  let x, r;
  let sqlselect = "select * from categories where id="+id;
  con.query(sqlselect, function(err, results, fields){
    x = results[0].status;
    if(x == 1){
      r = 0;
    }
    else{
      r = 1;
    }
    let sql = 'UPDATE categories SET status='+r+' WHERE id='+id;
    con.query(sql);
    categoriesAll = [];
    con.query('select * from categories', function (err, rows, fields) {
      if (err) throw err

      rows.forEach(element => {
        var x = new category(element.id, element.name, element.status, element.description);
        categoriesAll.push(x);
      })
    });
    
  });
  
  res.redirect('/gian-hang');
}

module.exports = router;
