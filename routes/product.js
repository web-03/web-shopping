import { Router } from 'express';
var router = Router();

/* GET home page. */
router.get('/product', function(req, res, next) {
  res.render('product', { title: 'Express' });

});

export default router;