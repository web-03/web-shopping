var express = require('express');
var router = express.Router();
var con = require('./../config/key');
var con1 = require('./../config/key');

const orderDetail = require('./../model/orderDetail');
const product = require('./../model/product');

var orderDetailAll = [];
var productAll = [];
/* GET home page. */
router.getIndex = (req, res, next) => {
  orderDetailAll = [];
  productAll = [];
    con.query('select * from order_detail where status = 1 and id_customer = ?', [req.user.id], function (err, rows, fields) {
    if (err) throw err

    rows.forEach(element => {
      var x = new orderDetail(element.id, element.id_customer, element.id_product, element.id_order, element.status, element.note);
      orderDetailAll.push(x);

    });
    console.log(orderDetailAll);
    
      var query = "select * from products WHERE";
      for (var i = 0;i<orderDetailAll.length ; i++)
      {
        query=query+" id = " + orderDetailAll[i].id_product;
        if (i+1 < orderDetailAll.length)
          query = query + " or ";
      }
      console.log(query);
      con.query(query, function (err, rows, fields) {
        if (err) throw err
  
        rows.forEach(element => {
          var x = new product(element.id, element.name, element.price, element.quantity, element.detail, element.id_category, element.image, element.status);
          productAll.push(x);
        })
         
        // res.json({"abc": productAll})
        console.log(productAll);
        res.render('shopping/shopping-cart', { user: req.user , productAll: productAll});
      });
    
    
    // res.render('shopping/shopping-cart', { user: req.user });
  });


  // 

};

module.exports = router;
