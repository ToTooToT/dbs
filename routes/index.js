var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user){
    console.log(req.session.user);
    res.render('index', { name: req.session.user[0].admin_name });
    //res.render('index');
  }else{
    res.render('login');
  }
});

//
//router.get('/index', function(req, res, next) {
//  //if(req.session.userId){
//  //  res.render('index', { title: 'Express' });
//  //}else{
//  //  res.render('login', { title: 'Login' });
//  //}
//  res.render('index', { title: 'Express' });
//});

module.exports = router;
