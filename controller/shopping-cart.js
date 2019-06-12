var express = require('express');
var router = express.Router();
var con = require('./../config/key');

const orderDetail = require('./../model/orderDetail');
const product = require('./../model/product');

var orderDetailAll = [];
var productAll = [];
var productSession = [];
var id_order = -1;
/* GET home page. */
router.getIndex = (req, res, next) => {
  orderDetailAll = [];
  productAll = [];

  productSession = req.session.productSession;
  console.log(productSession);
  if (productSession != undefined && productSession.length >= 1) {
    var ids = [];
    for (var i = 0; i < productSession.length; i++) {
      console.log(productSession[i].id);
      ids.push(productSession[i].id);
    }
    console.log(ids);
    let query = 'select * from products where id in (' + ids + ')';
    console.log(query);
    con.query(query, function (err, rows) {
      if (err) throw err

      for (var i = 0; i < rows.length; i++) {
        var x = new product(rows[i].id, rows[i].name, rows[i].price, productSession[i].quantity, rows[i].detail, rows[i].id_category, rows[i].image, rows[i].status);
        productAll.push(x);
      }

      console.log(productAll);
      res.render('shopping/shopping-cart', { user: req.user, productAll: productAll });
    })
  }
  else {
    res.render('shopping/shopping-cart', { user: req.user, productAll: productAll });
  }




};


// 


router.addOrder = async (req, res, next) => {

  var customer_name = req.body.customer_name;
  var phone_number = req.body.phone_number;
  var address = req.body.address + " " + req.body.quan + " " + req.body.tp;

  var sum_money = 100000;
  var id_order = -1;
  var id_customer = req.user.id;
  if (id_customer != undefined) {
    let sql = 'INSERT INTO orders (order_name,status,sum_money,id_customer) VALUES (' + '"abc"' + ',0,' + sum_money + ',' + id_customer + ')';
    console.log(sql);
    await con.query(sql);
    con.query('select id from orders where id_customer = ? and order_name = "abc"', [id_customer], function (err, rows, fields) {
      if (err) throw err

      rows.forEach(element => {
        id_order = element.id;
        let name = "OD" + id_order;
        sql = 'UPDATE orders SET order_name= "'+ name +'",address = "'+address+'" , phoneNumber =  "' + phone_number + '", customer_name = "' + customer_name + '" WHERE id=' + id_order;
        con.query(sql);
        console.log(sql)
        for (var i = 0; i < productSession.length; i++) {
          sql = 'INSERT INTO order_detail (id_product,status,note,id_order,id_customer,quantity) VALUES (' + productAll[i].id + ',1, "' + productSession[i].note + '" ,' + id_order + ',' + id_customer + ','+productAll[i].quantity +')';
          console.log(sql)
          con.query(sql);
        }

      })
      productSession=[];
      req.session.productSession = productSession;
      
      res.redirect('back');
    });
  }
  else{
    res.redirect('/tai-khoan');
  }




  // if (id_order != -1) {


  //   let sql = 'UPDATE orders SET address = "' + address + '" , phoneNumber =  "' + phone_number + '", customer_name = "' + customer_name + '", status = ' + 0 + ' WHERE id = ' + id_order;
  //   console.log(sql);
  //   await con.query(sql);
  //   sql = 'UPDATE order_detail SET status = ' + 0 + ' WHERE id_order = ' + id_order;
  //   console.log(sql);
  //   await con.query(sql);

  //   res.redirect('back');
  // }
  // else {
  //   res.redirect('/san-pham');
  // }
}



module.exports = router;
