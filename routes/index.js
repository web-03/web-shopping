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
var test = require('../controller/categories');
var homeController = require('../controller/home');
// var indexuserController=require('../controller/indexuser');
// var updateInfUserController=require('../controller/updateInfUser');
// var historyorderController=require('../controller/historyorder');



router.get('/tai-khoan',usersController.user);
router.post('/tai-khoan/dang-ki',usersController.signup);
router.post('/tai-khoan/dang-nhap',usersController.signin);
router.get('/dang-ki',signupController.getIndex);
router.get('/gioi-thieu',aboutController.getIndex);
router.get('/bai-viet',blogController.getIndex);
router.get('/san-pham',productController.getIndex);
router.get('/chi-tiet-san-pham/:id', productDetailController.getDetail);
router.get('/lien-he',contactController.getIndex);
router.get('/gio-hang',shoppingCartController.getIndex);
//router.get('/chi-tiet-san-pham',productDetailController.getIndex);
//router.get('chi-tiet-san-pham/:id',productController.getDetail);
router.get('/test',test.list);
router.get('/',homeController.getIndex);

// router.get('/nguoi-dung',indexuserController.getIndex);
// router.get('/cap-nhat-thong-tin',updateInfUserController.getIndex);
// router.get('/history-order',historyorderController.getIndex);
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('home/index', { title: 'Express' });
// });

module.exports = router;
