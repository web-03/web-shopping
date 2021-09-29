var express = require('express');
var router = express.Router();
var con = require('./../config/key');
const customer = require('./../model/customer');
  var customersAll = [];
  con.query('select * from customers WHERE status = 1', function (err, rows, fields) {
    if (err) throw err
  
    rows.forEach(element => {
      var x = new customer(element.id, element.name,  element.phoneNumber,element.place,element.account,element.password,element.status);
      customersAll.push(x);
    })
  });
  /* GET home page. */
  router.user = (req, res, next) => {
  
    
      res.render('user/user-detail',{ customer: customersAll ,user: req.user.id})
    };
  //get detail customer
router.getDetail = (req, res, next) => {
  let id = req.user.id;
  let sql = 'select * from customers where id = '+ id;
  console.log(sql);
  con.query(sql, function(err, results, fields){
    console.log(results[0]);
    var x = new customer(results[0].id, results[0].name, results[0].phoneNumber,results[0].place, results[0].account,results[0].password, results[0].status);
    res.render('user/user-detail',{customer : x,user: req.user});
    
  });
};
router.update=(req,res,next)=>{
  let id = req.user.id;
  let sql='UPDATE customers SET name="'+req.body.name+'",phoneNumber="'+req.body.phone+'",place="'+req.body.address+'" WHERE id ='+id;
  con.query(sql);
  console.log(sql);
  res.redirect('thong-tin-tai-khoan');
}
module.exports = router;
