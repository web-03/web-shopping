var express = require('express');
var router = express.Router();

/* GET users listing. */
router.getIndex = (req, res, next) => {
  res.render('user/signup',{user: req.user,message: req.flash('loginMessage')});
};

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
