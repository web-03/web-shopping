var express = require('express');
var router = express.Router();
var con = require('../config/key');
const order = require('./../model/order');
const product = require('./../model/product')


var ordersAll = [];
var id_order = -1;
var productAll =[];
/* GET home page. */
router.getIndex = (req, res, next) => {
  ordersAll = [];
  id_order = -1;
  con.query('SELECT o.*,date(o.created_at) as date FROM  orders o WHERE o.id_customer = ? ', [req.user.id], function (err, rows, fields) {
    if (err) throw err

    rows.forEach(element => {
      var x = new order(element.id, element.address, element.customer_name, element.order_name, element.sum_money, element.status,element.date,element.id_customer);
      ordersAll.push(x);

    });
    console.log(ordersAll);
    res.render('shopping/history-order', { user: req.user,orders :  ordersAll});
  });
};


// 


router.detail = (req,res,next)=>
{
  productAll =[];
  var id = req.params.id;
  console.log(id);
  if (ordersAll.length >=1)
  if (ordersAll[0].id_customer == req.user.id)
  {
    con.query('SELECT p.*, od.id_order,od.quantity as quantity2 FROM order_detail od, products p WHERE p.id = od.id_product and od.id_order = ?', [id], function (err, rows, fields) {
      if (err) throw err
  
      rows.forEach(element => {
        id_order = element.id_order;
        var x = new product(element.id, element.name, element.price, element.quantity2, element.detail, element.id_category, element.image, element.status);
        productAll.push(x);
  
      });
      console.log(productAll);

      res.render('shopping/history-order-detail', { user: req.user, productAll: productAll });
    });

}
else
{
  res.redirect('/tai-khoan');
}
else{
  res.redirect('/san-pham');
}
  
}
module.exports = router;
