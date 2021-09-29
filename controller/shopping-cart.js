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
    let query = 'select * from products where id in (' + ids + ') order by field (id,' + ids + ')';
    console.log(query);
    con.query(query, function (err, rows) {
      console.log(rows);
      if (rows != null) {
        for (var i = 0; i < rows.length; i++) {
          var x = new product(rows[i].id, rows[i].name, rows[i].price, productSession[i].quantity, rows[i].detail, rows[i].id_category, rows[i].image, rows[i].status, rows[i].quantity);
          productAll.push(x);
        }

        console.log(productAll);
        res.render('shopping/shopping-cart', { user: req.user, productAll: productAll, message: req.flash('loginMessage') });
      }
      else {
        res.render('shopping/shopping-cart', { user: req.user, productAll: productAll, message: req.flash('loginMessage') });
      }
    })
  }
  else {
    res.render('shopping/shopping-cart', { user: req.user, productAll: productAll, message: req.flash('loginMessage') });
  }




};


// 


router.addOrder = async (req, res, next) => {


  var customer_name = req.body.customer_name;
  var phone_number = req.body.phone_number;
  var address = req.body.address + " " + req.body.quan + " " + req.body.tp;

  var sum_money = 0;
  var id_order = -1;
  var id_customer = req.user.id;
  var outOfStock = 
  {
    quantity: -1,
    name:null
  };
  if (productAll.length >= 1) {
    if (id_customer != undefined) {
      for(var i = 0; i < productSession.length; i++)
      {
        if (productAll[i].remainQuantity - productSession[i].quantity < 0)
        {
          outOfStock.quantity = productAll[i].remainQuantity;
          outOfStock.name = productAll[i].name;
        }
      }
      console.log("===================");
      console.log(productAll);
      console.log(outOfStock);
      console.log("====================");
      if (outOfStock.quantity == -1) {
        for (var i = 0; i < productAll.length; i++) {
          sum_money = sum_money + (productAll[i].quantity * productAll[i].price);
        }
        let sql = 'INSERT INTO orders (order_name,status,sum_money,id_customer) VALUES (' + '"abc"' + ',0,' + sum_money + ',' + id_customer + ')';
        console.log(sql);
        await con.query(sql);
        con.query('select id from orders where id_customer = ? and order_name = "abc"', [id_customer], function (err, rows, fields) {
          if (err) throw err

          rows.forEach(element => {
            id_order = element.id;
            let name = "OD" + id_order;
            sql = 'UPDATE orders SET order_name= "' + name + '",address = "' + address + '" , phoneNumber =  "' + phone_number + '", customer_name = "' + customer_name + '" WHERE id=' + id_order;
            con.query(sql);
            console.log(sql)
            for (var i = 0; i < productSession.length; i++) {
              sql = 'INSERT INTO order_detail (id_product,status,note,id_order,id_customer,quantity) VALUES (' + productAll[i].id + ',1, "' + productSession[i].note + '" ,' + id_order + ',' + id_customer + ',' + productSession[i].quantity + ')';
              console.log(sql)
              con.query(sql);
              sql = 'UPDATE products SET quantity= ' + (productAll[i].remainQuantity - productSession[i].quantity) + ' where id =' + productAll[i].id;
              console.log(sql)
              con.query(sql);
            }

          })
          productSession = [];
          req.session.productSession = productSession;

          res.redirect('back');
        });
      }
      else {
        req.flash('loginMessage', outOfStock.name+' chỉ còn '+ outOfStock.quantity+' sản phẩm');
      res.redirect('/gio-hang');
      }
    }
    else{
      
      res.redirect('/tai-khoan');
    }
   

    
  }
  else {
    res.redirect('back');
  }
}
router.deleteProduct = (req, res, next) => {
  var id_product = req.params.id;


  for (var i = 0; i < productSession.length; i++) {
    if (parseInt(productSession[i].id) == id_product) {

      productSession.splice(i, 1);



    }
  }

  req.session.productSession = productSession;

  res.redirect('back');
}
router.changeQuantity = (req, res, next) => {
  var id_product = req.body.id_product;
  var quantity = parseInt(req.body.quantity);
  console.log(id_product + " change " + quantity);
  for (var i = 0; i < productSession.length; i++) {
    if (parseInt(productSession[i].id) == id_product) {
      productSession[i].quantity = quantity;
    }
  }

  req.session.productSession = productSession;
  console.log(productSession);
  res.send("changed");
}



module.exports = router;
