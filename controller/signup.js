var express = require('express');
var con = require('./../config/key');

const customer = require('./../model/customer');
var nodeMailer = require('nodemailer');
var mailSender = require('./../config/mail');
var passport = require('passport');
var router = express.Router();

/* GET users listing. */
router.getIndex = (req, res, next) => {
  res.render('user/signup',{user: req.user,message: req.flash('loginMessage')});
};

router.signup = (req,res,next)=>{
  
  

  passport.authenticate('local-signup',{
    successRedirect: '/tai-khoan',
    failureRedirect: '/dang-ki',
    failureFlash: true
  },function (err,user,info){
    if(err) {
      req.flash('loginMessage', err.message)
      return res.redirect('/dang-ki');
    }

    if(!user) {
      req.flash('loginMessage', 'Tên đăng nhập hoặc địa chỉ email hoặc số điện thoại đã được sử dụng');
    
      return res.redirect('/dang-ki');
    }

    // return req.logIn(user, function(err) {
    //     if(err) {
    //       req.flash('loginMessage', 'Tài khoản hoặc mật khẩu không chính xác')
    
    //       return res.redirect('/dang-ki');
          
    //     } else {
    //         return res.redirect('/');
    //     }
    // });
    else{
      console.log(user);
      
      
      
      let text = "click vào link bên dưới để xác minh tài khoản của bạn. \n https://web-shopping.herokuapp.com/confirm?id=" + user.id +"&key="+user.key;
      
      let transporter = nodeMailer.createTransport(mailSender);
      let mailOptions = {
          // should be replaced with real recipient's account
          
          to: user.email,
          subject: "web-shopping.herokuapp.com",
          text: text
      };
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
      });
      req.flash('loginMessage', 'Đăng kí thành công, vui lòng xác minh tài khoản để đăng nhập!')
      res.redirect('/tai-khoan',);
    }
    
  })(req, res, next);
  //   let sql='INSERT INTO customers(name, phoneNumber, place,account,password,status) VALUES ("'+name+'","'+phoneNumber+'","'+address+'","'+account+'","'+password+'",1)';
  //   con.query(sql);
  // res.redirect('/tai-khoan');
  
}

router.confirmMail = (req,res,next)=>
{
 const id = req.query.id;
 const key= req.query.key;
 con.query("SELECT * FROM customers WHERE id = ?",[id], function(err, rows) {
  if (rows.length)
  {
    console.log(rows);
    if(key == rows[0].confirm_key && rows[0].status ==2)
    {

      con.query("UPDATE customers SET status = ? , confirm_key = ? WHERE customers.id = "+id,[1,"Đã xác thực"]);
      req.flash('loginMessage', 'Xác thực tài khoản thành công');
      res.redirect('/tai-khoan');

    }
    else {
      res.redirect('/');
    }
  }
 });
}
module.exports = router;
