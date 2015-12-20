var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
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


router.get('/timeInsert', function (req, res, next) {

    res.render('page/timeInsert', {
        title: '수업 시간등록',
        name: req.session.user[0].admin_name,
        mode: req.session.grade
    });

});
router.post('/timeInsert2', function (req, res, next) {

    res.render('page/timeInsert2', {
        title: '상주 시간등록',
        name: req.session.user[0].admin_name,
        mode: req.session.grade
    });

});


router.get('/scheduleInsert', function (req, res, next) {

    res.render('page/scheduleInsert', {
        title: '개인스케줄등록',
        name: req.session.user[0].admin_name,
        mode: req.session.grade
    });

});


router.get('/schedulePresent', function (req, res, next) {

    res.render('page/schedulePresent', {
        title: '개인스케줄현황',
        name: req.session.user[0].admin_name,
        mode: req.session.grade
    });

});


module.exports = router;
