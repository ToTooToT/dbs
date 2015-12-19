var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.userId){
    res.render('index', { title: 'Express' });
  }else{
    res.render('login', { title: 'Login' });
  }
});


router.get('/index', function(req, res, next) {
  //if(req.session.userId){
  //  res.render('index', { title: 'Express' });
  //}else{
  //  res.render('login', { title: 'Login' });
  //}
  res.render('index', { title: 'Express' });
});

module.exports = router;
