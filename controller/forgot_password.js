var express = require('express');

var con = require('./../config/key');
var nodeMailer = require('nodemailer');
var mailSender = require('./../config/mail');
const rd = require('randomstring');

var bcrypt = require('bcrypt-nodejs');
var router = express.Router();


router.getIndex = (req,res,next)=>
{
    res.render('user/forgot-password',{user: req.user,message: req.flash('loginMessage') });
}
router.forgotpass = (req,res,next)=>
{
    var account = req.body.account;
    con.query('select * from customers where account = ?',[account],function(err,rows,fields){
        if (err){
            console.log("error");
                return;
            }
        if(!rows.length)
        {
            req.flash('loginMessage', 'Tài khoản không tồn tại')
    
            return res.redirect('/quen-mat-khau');
        }
        else {
            var password = rd.generate();
            con.query('update customers set password = ? where account = ?',[bcrypt.hashSync(password),account]);
            var email = rows[0].email;
            let text = "Mật khẩu của bạn được khởi tạo mặc định là: "+password+ "\n Đăng nhập https://web-shopping.herokuapp.com/tai-khoan";
      
      let transporter = nodeMailer.createTransport(mailSender);
      let mailOptions = {
          // should be replaced with real recipient's account
          
          to: email,
          subject: "web-shopping.herokuapp.com",
          text: text
      };
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
      });
      req.flash('loginMessage', 'Mật khẩu đã được gửi về mail của bạn')
      res.redirect('/tai-khoan')
        }
    })
}

module.exports = router;