var express = require('express');
var router = express.Router();
var usersController = require('../controller/user');
var aboutController = require('../controller/about');
var blogController = require('../controller/blog');
var productController = require('../controller/product');
var contactController = require('../controller/contact');
var shoppingCartController = require('../controller/shopping-cart');
var productDetailController = require('../controller/product-detail');
var signupController = require('../controller/signup');
var userDetailController = require('../controller/user-detail');
var test = require('../controller/categories');
var homeController = require('../controller/home');
const historyorderController = require('../controller/history-order');
const forgotpasswordController = require('../controller/forgot_password');
const changepasswordController = require('../controller/change_password');
// var updateInfUserController=require('../controller/updateInfUser');
// var historyorderController=require('../controller/historyorder');



router.get('/tai-khoan',usersController.user);
router.post('/tai-khoan/dang-ki',signupController.signup);
router.post('/tai-khoan/dang-nhap',usersController.signin);
router.post('/tai-khoan/check-account',usersController.check);
router.post('/tai-khoan/check-email',usersController.checkEmail);
router.post('/tai-khoan/check-phone',usersController.checkPhone);
router.get('/confirm',signupController.confirmMail);
router.get('/dang-ki',signupController.getIndex);
router.get('/gioi-thieu',aboutController.getIndex);
router.get('/bai-viet',blogController.getIndex);
router.get('/san-pham',productController.getIndex);
// router.get('/san-pham/:type & :from',productController.getIndex);
router.get('/san-pham/tim-kiem',productController.getSearch);
router.get('/chi-tiet-san-pham/:id', productDetailController.getDetail);
router.post('/chi-tiet-san-pham',productDetailController.order);
router.post('/chi-tiet-san-pham/comment',productDetailController.comment);
router.get('/lien-he',contactController.getIndex);
router.get('/gio-hang',shoppingCartController.getIndex);
router.post('/gio-hang/change-quantity',shoppingCartController.changeQuantity);
router.get('/gio-hang/:id', shoppingCartController.deleteProduct);
router.post('/gio-hang',isLoggedIn,shoppingCartController.addOrder);
router.get('/lich-su-mua-hang',isLoggedIn,historyorderController.getIndex);
router.get('/chi-tiet-mua-hang/:id',isLoggedIn,historyorderController.detail);
router.get('/dang-xuat',usersController.logout);
router.get('/thong-tin-tai-khoan', isLoggedIn ,userDetailController.getDetail);
router.post('/thong-tin-tai-khoan', isLoggedIn, userDetailController.update);
router.get('/quen-mat-khau' ,forgotpasswordController.getIndex);
router.post('/quen-mat-khau' ,forgotpasswordController.forgotpass);
router.get('/doi-mat-khau' ,isLoggedIn,changepasswordController.getIndex);
router.post('/doi-mat-khau' ,isLoggedIn,changepasswordController.changepassword);
//router.get('/chi-tiet-san-pham',productDetailController.getIndex);
//router.get('chi-tiet-san-pham/:id',productController.getDetail);

router.get('/',homeController.getIndex);

// router.get('/nguoi-dung',indexuserController.getIndex);
// router.get('/cap-nhat-thong-tin',updateInfUserController.getIndex);
// router.get('/history-order',historyorderController.getIndex);
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('home/index', { title: 'Express' });
// });
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
    res.redirect('/tai-khoan');
}
module.exports = router;
