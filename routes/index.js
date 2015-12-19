var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.session.user) {
        console.log(req.session.user);
        pool.getConnection(function (err, conn) {
            conn.query("select N.script_num as nid, N.title as title, N.reg_date as reg_date, A.admin_name as writer from notice N, admin A where N.admin_num=A.admin_num  order by reg_date desc", function (err, rows) {
                if (err) console.log("err:" + err);
                console.log(JSON.stringify(rows));
                res.render('page/noticeList', {
                    title: '공지사항',
                    rows: rows,
                    name: req.session.user[0].admin_name
                });
            });
            conn.release();
        });
    } else {
        res.render('login');
    }
});

router.get('/notice/:nid/:writer', function (req, res, next) {
    if (req.session.user) {
        var nid = req.params.nid;
        var writer = req.params.writer;
        console.log("ID VAL: " + nid);
        var sql = "select * from notice where script_num=?";
        pool.getConnection(function (err, conn) {
            conn.query(sql, nid, function (err, row) {
                res.render('page/noticeView', {
                    title: '공지보기',
                    row: row,
                    writer: writer,
                    name: req.session.user[0].admin_name
                });
            });
            conn.release();
        });
    } else {
        res.render('login');
    }
});

router.get('/scheduleReq', function (req, res, next) {
    if (req.session.user) {
        var sql = "select * from personal_schedule";
        pool.getConnection(function (err, conn) {
            conn.query(sql, function (err, rows) {
                res.render('page/scheduleReq', {
                    title: '스케줄현황',
                    rows: rows,
                    name: req.session.user[0].admin_name
                });
            });
            conn.release();
        });
    } else {
        res.render('login');
    }
});

router.get('/scheduleAptA', function (req, res, next) {
    if (req.session.user) {
        var sql = "select * from personal_schedule where accept_op = 'A'";
        pool.getConnection(function (err, conn) {
            conn.query(sql, function (err, rows) {
                res.render('page/scheduleApt', {
                    title: '스케줄승인현황',
                    rows: rows,
                    name: req.session.user[0].admin_name
                });
            });
            conn.release();
        });
    } else {
        res.render('login');
    }
});

router.get('/scheduleAptR', function (req, res, next) {
    if (req.session.user) {
        var sql = "select * from personal_schedule where accept_op = 'R'";
        pool.getConnection(function (err, conn) {
            conn.query(sql, function (err, rows) {
                res.render('page/scheduleApt', {
                    title: '스케줄거절현황',
                    rows: rows,
                    name: req.session.user[0].admin_name
                });
            });
            conn.release();
        });
    } else {
        res.render('login');
    }
});

router.get('/offScheduleAdd', function (req, res, next) {
    if (req.session.user) {
        res.render('page/offScheduleAdd', {
            title: '스케줄거절현황',
            name: req.session.user[0].admin_name
        });
    } else {
        res.render('login');
    }
});

router.get('/offScheduleList', function (req, res, next) {
    if (req.session.user) {
        var sql = "select * from official_schedule o, admin a where o.admin_num = a.admin_num";
        pool.getConnection(function (err, conn) {
            conn.query(sql, function (err, rows) {
                res.render('page/offScheduleList', {
                    title: '공식스케줄현황',
                    rows: rows,
                    name: req.session.user[0].admin_name
                });
            });
            conn.release();
        });
    } else {
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
