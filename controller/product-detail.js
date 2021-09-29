var express = require('express');
var router = express.Router();
var con = require('./../config/key');
const product = require('./../model/product');
const review = require('./../model/review');


var productsAll = [];
var id = -1;


/* GET home page. */
router.getIndex = (req, res, next) => {
  productsAll = [];
  con.query('select * from products', function (err, rows, fields) {
    if (err) throw err
  
    rows.forEach(element => {
      var x = new product(element.id, element.name, element.price,element.quantity, element.detail,element.id_category,element.image, element.status);
      productsAll.push(x);
    })
    res.render('product/product-detail',{user: req.user});
  });
  
};

router.getDetail = (req, res, next) => {
  id = req.params.id;
  let comment=[];
  let category=[];
  let relatedproduct=[];
  let sql =  'select * from products where id = '+ id;
  console.log(sql);
  con.query(sql, function(err, results, fields){
    if (err) throw err
    console.log(results[0]);
    var x = new product(results[0].id, results[0].name, results[0].price,results[0].quantity, results[0].detail,results[0].id_category,results[0].image, results[0].status);
    category.push(results[0].id_category);
   
  
    con.query('SELECT p.id,com.comments as comment,com.user_name as username from products p,comment com where p.id='+id+' and p.id=com.id_product',function(err, rows, fields){
      if (err) throw err
      rows.forEach(element=>{
        var z=new review(element.comment,element.username);
        comment.push(z);
    })
    console.log(comment);
    con.query('select * from products where id_category='+category[0]+' ORDER BY RAND() LIMIT 5',function(err, rows, fields){
      if (err) throw err
      rows.forEach(element=>{
        var y=new product(element.id, element.name, element.price,element.quantity, element.detail,element.id_category,element.image, element.status);
        relatedproduct.push(y);
      })
    if(relatedproduct.length==1) relatedproduct=[];
      
    console.log(relatedproduct);
    res.render('product/product-detail',{product : x,comment:comment,relatedproduct:relatedproduct,user: req.user}); 
  })
  });
});
}

router.order = (req,res,next) =>{
  var id_product = req.body.id_product;
  var note = "color:"+ req.body.color +", size: " + req.body.size;
  var num_product = parseInt( req.body.num_product);
  let productSessionList = [];
  var productSession={
    id: null,
    quantity: null,
    note: null
  };
  if(req.session.productSession != undefined)
  {
    productSessionList = req.session.productSession;
    for (var i = 0 ; i<productSessionList.length;i++)
    {
      if(id_product == productSessionList[i].id)
      {
        productSessionList[i].quantity = productSessionList[i].quantity + num_product;
        req.session.productSession = productSessionList;
        console.log(req.session);
        res.send("added");
        return;
      }
    }
    
  }
  productSession.id = id_product;
  productSession.quantity = num_product;
  productSession.note = note;
  productSessionList.push(productSession);
  

  console.log(productSessionList);
  console.log(id_product);
  console.log(req.session);
  

  req.session.productSession = productSessionList;
  console.log(req.session);
  res.send("added");

}
router.demo = (req,res,next)=>{
  var id_product = req.body.id_product;
 
  var note = "color:"+ req.body.color +", size: " + req.body.size;
  var id_customer = req.user.id;
  console.log("--------------------------aaaaaaaaaaaaaaaaaaaaa-----------------------");
  console.log(id_product);
  console.log(note);
 
  var sum_money = 100000;
  var id_order =-1;
  con.query('select id from orders where id_customer = ? and status = -1',[id_customer], async function (err, rows, fields) {
    if (err) throw err
  
    rows.forEach(element => {
      id_order = element.id;
    })
    if(id_order == -1)
    {
      
    }
    else
    {
      sql = 'INSERT INTO order_detail (id_product,status,note,id_order,id_customer) VALUES ('+id_product+',1,"'+note+'",'+ id_order + ','+id_customer+')';
      con.query(sql);
    }

    res.send("added");
  });
};

  
  
router.comment=(req, res, next) => {
  console.log(req.body);
  console.log(req.user);
  var username=req.body.name;
  let comment=req.body.review;
  if (req.user != undefined)
  {
   username=req.user.name;
  con.query('INSERT INTO comment (comments,id_product,user_name) VALUES ("'+comment+'",'+id+ ',"'+username+'")');
  }
  else
{
  con.query('INSERT INTO comment (comments,id_product,user_name) VALUES ("'+comment+'",'+id+',"'+username+'")');
}
res.redirect('back');
}
module.exports = router;
