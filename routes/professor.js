var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
    if (req.session.user) {
        pool.getConnection(function (err, conn) {
            conn.query("select *, admin_name as writer, script_num as nid from notice N, admin A where N.admin_num = A.admin_num order by reg_date desc", function (err, rows) {
                if (err) console.log("err:" + err);
                console.log(JSON.stringify(rows));
                res.render('page/noticeList', {
                    title: '공지사항',
                    rows: rows,
                    name: req.session.user[0].s_name,
                    mode: req.session.grade
                });
            });
            conn.release();
        });
    } else {
        res.render('login');
    }
});


router.get('/sitPresent/:room', function (req, res, next) {
    if (req.session.user) {
        var rNo = req.params.room+"호 실시간 자리현황";

        res.render('page/sitPresent', {
            title: rNo,
            name: req.session.user[0].s_name,
            mode: req.session.grade
        });
    } else {
        res.redirect('/');
    }
});


router.get('/stats', function (req, res, next) {
    if (req.session.user) {

        res.render('page/stats', {
            title: '출결통계',
            name: req.session.user[0].s_name,
            mode: req.session.grade
        });
    } else {
        res.redirect('/');
    }
});



module.exports = router;
