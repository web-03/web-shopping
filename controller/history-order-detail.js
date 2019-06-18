var express = require('express');
var router = express.Router();
var con = require('../config/key');
var con1 = require('../config/key');

const orderDetail = require('../model/orderDetail');
const product = require('../model/product');

var orderDetailAll = [];
var productAll = [];
var id_order = -1;
/* GET home page. */
router.getIndex = (req, res, next) => {
  orderDetailAll = [];
  productAll = [];
  id_order = -1;
  con.query('SELECT p.*, od.id_order,od.quantity as quantity2 FROM order_detail od, products p WHERE od.status = 1 AND od.id_customer = ? AND p.id = od.id_product', [req.user.id], function (err, rows, fields) {
    if (err) throw err

    rows.forEach(element => {
      id_order = element.id_order;
      var x = new product(element.id, element.name, element.price, element.quantity2, element.detail, element.id_category, element.image, element.status);
      productAll.push(x);

    });

    res.render('shopping/history-order-detail', { user: req.user, productAll: productAll });
  });
};


// 


router.addOrder = async (req, res, next) => {

  var customer_name = req.body.customer_name;
  var phone_number = req.body.phone_number;
  var address = req.body.address + " " + req.body.quan + " " + req.body.tp;
  if (id_order != -1) {


    let sql = 'UPDATE orders SET address = "' + address + '" , phoneNumber =  "' + phone_number + '", customer_name = "' + customer_name + '", status = ' + 0 + ' WHERE id = ' + id_order;
    console.log(sql);
    await con.query(sql);
    sql = 'UPDATE order_detail SET status = ' + 0 + ' WHERE id_order = ' + id_order;
    console.log(sql);
    await con.query(sql);

    res.redirect('back');
  }
  else {
    res.redirect('/san-pham');
  }
}
module.exports = router;
