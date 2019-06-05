var express = require('express');
var router = express.Router();
var con = require('./../config/key');
const product = require('./../model/product');


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

router.order = (req,res,next)=>{
  var id_product = req.body.id_product;
 
  var note = "color:"+ req.body.color +", size: " + req.body.size;
  var id_customer = req.user.id;
  console.log("--------------------------aaaaaaaaaaaaaaaaaaaaa-----------------------");
  console.log(id_product);
  console.log(note);
 
  var sum_money = 100000;
  var id_order =-1;
  con.query('select id from orders where id_customer = ? and status = -1',[id_customer], async function (err, rows, fields) {
    if (err) throw err
  
    rows.forEach(element => {
      id_order = element.id;
    })
    if(id_order == -1)
    {
      let sql = 'INSERT INTO orders (order_name,status,sum_money,id_customer) VALUES ('+'"abc"'+',-1,'+ sum_money+ ','+id_customer+')';
      console.log(sql);
      await con.query(sql);
      con.query('select id from orders where id_customer = ? and status = -1',[id_customer], function (err, rows, fields) {
        if (err) throw err
        
        rows.forEach(element => {
          id_order = element.id;
          let name = "OD"+id_order;
          sql = 'UPDATE orders SET order_name="' + name + '" WHERE id=' + id_order;
          con.query(sql);
          console.log(sql)
          sql = 'INSERT INTO order_detail (id_product,status,note,id_order,id_customer) VALUES ('+id_product+',1, "'+note+'" ,'+ id_order + ','+id_customer+')';
          console.log(sql) 
          con.query(sql);
        })
        
      });
    }
    else
    {
      sql = 'INSERT INTO order_detail (id_product,status,note,id_order,id_customer) VALUES ('+id_product+',1,"'+note+'",'+ id_order + ','+id_customer+')';
      con.query(sql);
    }

    res.send("added");

  });
  

  


  
}
module.exports = router;
