var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //if(req.session.userId){

    pool.getConnection(function(err, conn){
      conn.query("select N.script_num as nid, N.title as title, N.reg_date as reg_date, A.admin_name as writer from notice N, admin A where N.admin_num=A.admin_num  order by reg_date desc",  function(err, rows){
        if(err) console.log("err:"+err);
        console.log(JSON.stringify(rows));
        res.render('index', {title: '공지사항',  rows:rows, mode:-1 });

      })
      conn.release();;

    });

  //}else{
  //  res.render('login', { title: 'Login' });
  //}
});

router.get('/notice/:nid/:writer', function(req, res, next) {
  var nid = req.params.nid;
  var writer = req.params.writer;
  console.log("ID VAL: "+nid);
  var sql = "select * from notice where script_num=?";
  pool.getConnection(function(err, conn){
    conn.query(sql, nid, function(err, row){
      res.render('index', { title: '공지보기', row:row, mode:"view", writer:writer });
    });
    conn.release();
  });

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
