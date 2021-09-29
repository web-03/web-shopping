var express = require('express');

var con = require('./../config/key');
var nodeMailer = require('nodemailer');
var mailSender = require('./../config/mail');
const rd = require('randomstring');

var bcrypt = require('bcrypt-nodejs');
var router = express.Router();


router.getIndex = (req,res,next)=>
{
    res.render('user/change-password',{user: req.user,message: req.flash('loginMessage') });
}
router.changepassword = (req,res,next)=>
{
    let account = req.user.account;
  // let oldPassword = bcrypt.hashSync(req.body.oldPassword, null, null);
  let oldPassword = req.body.oldPassword;
  let password = bcrypt.hashSync(req.body.password, null, null);
  console.log("oldpass: " + oldPassword);
  let x, r;
  let sqlselect = 'select * from customers where account="' + account + '"';
  con.query(sqlselect, function (err, results, fields) {
    x = results[0].password;
    console.log(x);
    if (bcrypt.compareSync(oldPassword, x)) {
      let sql = 'UPDATE customers SET password="' + password + '" WHERE account="' + account + '"';
      con.query(sql, function (err, results, fields) { });
      req.logout();
      req.flash('loginMessage', 'Đổi mật khẩu thành công!')
    
      return res.redirect('/tai-khoan');
      
    }
    else {
        req.flash('loginMessage', 'Mật khẩu cũ không chính xác!')
    
        return res.redirect('/doi-mat-khau');
    }
  });
}

module.exports = router;