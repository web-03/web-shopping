var express = require('express');
var router = express.Router();

/* GET home page. */
router.getIndex = (req, res, next) => {
  res.render('blog/blog');
};

module.exports = router;
