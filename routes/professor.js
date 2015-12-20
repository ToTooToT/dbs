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
                    name: req.session.user[0].p_name,
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
            name: req.session.user[0].p_name,
            mode: req.session.grade
        });
    } else {
        res.redirect('/');
    }
});


router.get('/stats', function (req, res, next) {
    if (req.session.user) {
        pool.getConnection(function (err, conn) {
            var sql = "select * from student where s_num in (select s_num from timetable group by s_num);";
            conn.query(sql, function (err, rows) {
                var stateusP = [];
                if (err) console.log("err:" + err);
                console.log(JSON.stringify(rows));
                rows.forEach(function (student) {
                    var count = 0;
                    var sql1 = "select s_num, (count(start_time)*3600) as req_times, day from timetable where s_num = " + student.s_num + " and check_code = 'p' group by day;";
                    conn.query(sql1, function (err, daysRows) {
                        if (err) console.log("err:" + err);
                        var sql2 = "select s_num, DATE_FORMAT(atd_start_time, '%Y-%m-%d') as date, sum(TIME_TO_SEC(TIMEDIFF(atd_end_time, atd_start_time))) as atd_times, DAYNAME(atd_start_time) as day from attendance_time where s_num=" + student.s_num + " and atd_end_time is not null group by date having date between '2015-12-01' and '2015-12-31'";
                        conn.query(sql2, function (err, myRows) {
                            if (err) console.log("err:" + err);
                            var t_atd_time = 0;
                            var t_req_time = 0;
                            myRows.forEach(function (t) {
                                t_atd_time += t.atd_times;
                                if (daysRows[0].req_times != undefined) {
                                    t_req_time += daysRows[0].req_times;
                                    console.log("출석시간 " + t.atd_times + " 요구시간" + daysRows[0].req_times);
                                }
                            });
                            stateusP.push(((t_atd_time / t_req_time) * 100).toFixed(2) + "%");
                            console.log(stateusP);
                        });
                    });
                });
                setTimeout(function() {
                    console.log(JSON.stringify(rows));
                    res.render('page/stats', {
                        title: '출결통계',
                        rows: rows,
                        stateusP: stateusP.reverse(),
                        name: req.session.user[0].p_name,
                        mode: req.session.grade
                    });
                }, 500);
            });
            conn.release();
        });
    } else {
        res.redirect('/');
    }
});





module.exports = router;
