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
                    name: req.session.user[0].s_name,
                    mode: req.session.grade
                });
            });
            conn.release();
        });
    } else {
        res.redirect('/');
    }
});


router.get('/timeInsert', function (req, res, next) {
    if (req.session.user) {

        res.render('page/timeInsert', {
            title: '수업 시간등록',
            name: req.session.user[0].s_name,
            mode: req.session.grade
        });
    } else {
        res.redirect('/');
    }
});

router.post('/timeInsert', function (req, res, next) {
    if (req.session.user) {
        var mon = req.body.mon,
            tue = req.body.tue,
            wed = req.body.wed,
            thu = req.body.thu,
            fri = req.body.fri;
        pool.getConnection(function (err, connection) {
            if (mon != undefined)
                mon.forEach(function (thisMon) {
                    var tableData = [req.session.user[0].s_num];
                    thisMon == '90000' ? thisMon = '090000' : thisMon = thisMon;
                    tableData.push(thisMon);
                    tableData.push(parseInt(thisMon) + 10000);
                    console.log(tableData);
                    var sql = "insert into timetable values('', ?, ?, ?, 'c', 'mon');";
                    connection.query(sql, tableData, function (err, rows) {
                        if (err) console.error("err : " + err);
                        console.log("rows : " + JSON.stringify(rows));
                    });
                });
            if (tue != undefined)
                tue.forEach(function (thisMon) {
                    var tableData = [req.session.user[0].s_num];
                    thisMon == '90000' ? thisMon = '090000' : thisMon = thisMon;
                    tableData.push(thisMon);
                    tableData.push(parseInt(thisMon) + 10000);
                    console.log(tableData);
                    var sql = "insert into timetable values('', ?, ?, ?, 'c', 'tue');";
                    connection.query(sql, tableData, function (err, rows) {
                        if (err) console.error("err : " + err);
                        console.log("rows : " + JSON.stringify(rows));
                    });
                });
            if (wed != undefined)
                wed.forEach(function (thisMon) {
                    var tableData = [req.session.user[0].s_num];
                    thisMon == '90000' ? thisMon = '090000' : thisMon = thisMon;
                    tableData.push(thisMon);
                    tableData.push(parseInt(thisMon) + 10000);
                    console.log(tableData);
                    var sql = "insert into timetable values('', ?, ?, ?, 'c', 'wed');";
                    connection.query(sql, tableData, function (err, rows) {
                        if (err) console.error("err : " + err);
                        console.log("rows : " + JSON.stringify(rows));
                    });
                });
            if (thu != undefined)
                thu.forEach(function (thisMon) {
                    var tableData = [req.session.user[0].s_num];
                    thisMon == '90000' ? thisMon = '090000' : thisMon = thisMon;
                    tableData.push(thisMon);
                    tableData.push(parseInt(thisMon) + 10000);
                    console.log(tableData);
                    var sql = "insert into timetable values('', ?, ?, ?, 'c', 'thu');";
                    connection.query(sql, tableData, function (err, rows) {
                        if (err) console.error("err : " + err);
                        console.log("rows : " + JSON.stringify(rows));
                    });
                });
            if (fri != undefined)
                fri.forEach(function (thisMon) {
                    var tableData = [req.session.user[0].s_num];
                    thisMon == '90000' ? thisMon = '090000' : thisMon = thisMon;
                    tableData.push(thisMon);
                    tableData.push(parseInt(thisMon) + 10000);
                    console.log(tableData);
                    var sql = "insert into timetable values('', ?, ?, ?, 'c', 'fri');";
                    connection.query(sql, tableData, function (err, rows) {
                        if (err) console.error("err : " + err);
                        console.log("rows : " + JSON.stringify(rows));
                    });
                });
            res.render('page/timeInsert2', {
                title: '상주 시간등록',
                name: req.session.user[0].s_name,
                mode: req.session.grade
            });
            connection.release();
        });
    } else {
        res.redirect('/');
    }
});

router.post('/timeInsert2', function (req, res, next) {
    if (req.session.user) {
        var mon = req.body.mon,
            tue = req.body.tue,
            wed = req.body.wed,
            thu = req.body.thu,
            fri = req.body.fri;
        pool.getConnection(function (err, connection) {
            if (mon != undefined)
                mon.forEach(function (thisMon) {
                    var tableData = [req.session.user[0].s_num];
                    thisMon == '90000' ? thisMon = '090000' : thisMon = thisMon;
                    tableData.push(thisMon);
                    tableData.push(parseInt(thisMon) + 10000);
                    console.log(tableData);
                    var sql = "insert into timetable values('', ?, ?, ?, 'p', 'mon');";
                    connection.query(sql, tableData, function (err, rows) {
                        if (err) console.error("err : " + err);
                        console.log("rows : " + JSON.stringify(rows));
                    });
                });
            if (tue != undefined)
                tue.forEach(function (thisMon) {
                    var tableData = [req.session.user[0].s_num];
                    thisMon == '90000' ? thisMon = '090000' : thisMon = thisMon;
                    tableData.push(thisMon);
                    tableData.push(parseInt(thisMon) + 10000);
                    console.log(tableData);
                    var sql = "insert into timetable values('', ?, ?, ?, 'p', 'tue');";
                    connection.query(sql, tableData, function (err, rows) {
                        if (err) console.error("err : " + err);
                        console.log("rows : " + JSON.stringify(rows));
                    });
                });
            if (wed != undefined)
                wed.forEach(function (thisMon) {
                    var tableData = [req.session.user[0].s_num];
                    thisMon == '90000' ? thisMon = '090000' : thisMon = thisMon;
                    tableData.push(thisMon);
                    tableData.push(parseInt(thisMon) + 10000);
                    console.log(tableData);
                    var sql = "insert into timetable values('', ?, ?, ?, 'p', 'wed');";
                    connection.query(sql, tableData, function (err, rows) {
                        if (err) console.error("err : " + err);
                        console.log("rows : " + JSON.stringify(rows));
                    });
                });
            if (thu != undefined)
                thu.forEach(function (thisMon) {
                    var tableData = [req.session.user[0].s_num];
                    thisMon == '90000' ? thisMon = '090000' : thisMon = thisMon;
                    tableData.push(thisMon);
                    tableData.push(parseInt(thisMon) + 10000);
                    console.log(tableData);
                    var sql = "insert into timetable values('', ?, ?, ?, 'p', 'thu');";
                    connection.query(sql, tableData, function (err, rows) {
                        if (err) console.error("err : " + err);
                        console.log("rows : " + JSON.stringify(rows));
                    });
                });
            if (fri != undefined)
                fri.forEach(function (thisMon) {
                    var tableData = [req.session.user[0].s_num];
                    thisMon == '90000' ? thisMon = '090000' : thisMon = thisMon;
                    tableData.push(thisMon);
                    tableData.push(parseInt(thisMon) + 10000);
                    console.log(tableData);
                    var sql = "insert into timetable values('', ?, ?, ?, 'p', 'fri');";
                    connection.query(sql, tableData, function (err, rows) {
                        if (err) console.error("err : " + err);
                        console.log("rows : " + JSON.stringify(rows));
                    });
                });
            res.redirect('/student');
            connection.release();
        });
    } else {
        res.redirect('/');
    }
});

router.get('/scheduleInsert', function (req, res, next) {
    if (req.session.user) {

        res.render('page/scheduleInsert', {
            title: '개인스케줄등록',
            name: req.session.user[0].s_name,
            mode: req.session.grade
        });
    } else {
        res.redirect('/');
    }
});

router.post('/scheduleInsert', function (req, res, next) {
    if (req.session.user) {
        var scheduleTxt = req.body.scheduleTxt;
        var scheduleStartDate = req.body.scheduleStartDate;
        var scheduleEndDate = req.body.scheduleEndDate;
        var scheduleStartTime = req.body.scheduleStartTime;
        var scheduleEndTime = req.body.scheduleEndTime;
        var s_num = req.session.user[0].s_num;
        var date = new Date();
        var scheData = [s_num, date, scheduleStartDate, scheduleEndDate, scheduleStartTime, scheduleEndTime, scheduleTxt];

        console.log(scheData);
        pool.getConnection(function (err, connection) {
            var sql = "insert into personal_schedule values(?, ?, null, ?, ?, ?, ?, ?, null);";
            connection.query(sql, scheData, function (err, rows) {
                if (err) console.error("err : " + err);
                console.log("rows : " + JSON.stringify(rows));
            });
            res.redirect('/student/schedulePresent');
            connection.release();
        });
    } else {
        res.redirect('/');
    }
});

router.get('/schedulePresent', function (req, res, next) {
    if (req.session.user) {
        var s_num = req.session.user[0].s_num;
        pool.getConnection(function (err, connection) {
            var sql = "select * from personal_schedule where s_num = ?";
            connection.query(sql, [s_num], function (err, rows) {
                if (err) console.error("err : " + err);
                console.log("rows : " + JSON.stringify(rows));
                res.render('page/schedulePresent', {
                    title: '개인스케줄현황',
                    rows: rows,
                    name: req.session.user[0].s_name,
                    mode: req.session.grade
                });
            });
            connection.release();
        });
    } else {
        res.redirect('/');
    }
});


router.get('/attendChk', function (req, res, next) {
    if (req.session.user) {

        res.render('page/attendChk', {
            title: '출결현황',
            name: req.session.user[0].admin_name,
            mode: req.session.grade
        });
    } else {
        res.redirect('/');
    }
});


router.get('/outForm', function (req, res, next) {
    if (req.session.user) {
        res.render('page/outForm', {
            title: '퇴실신청서',
            name: req.session.user[0].admin_name,
            mode: req.session.grade
        });
    } else {
        res.redirect('/');
    }
});

router.post('/outForm', function (req, res, next) {
    if (req.session.user) {
        var scheduleTxt = req.body.scheduleTxt;
        var eqChk = req.body.eqChk;
        var s_num = req.session.user[0].s_num;
        var enter_rq_date = req.params.enter_rq_date;
        var outData = [scheduleTxt, eqChk, s_num];
        console.log(outData);
        pool.getConnection(function (err, connection) {
            var sql = "update enter_out_career set out_rq_date = now(), out_rsn = ?, equipment = ?, fc_out_op = 'N' where s_num = ? and out_hd_date is null;";
            connection.query(sql, outData, function (err, rows) {
                if (err) console.error("err : " + err);
                console.log("rows : " + JSON.stringify(rows));
                res.redirect('/student');
            });
            connection.release();
        });
    } else {
        res.redirect('/');
    }
});

router.post('/atdTimeStart', function (req, res, next) {
    var fp = req.body.fp;
    var s_num;
    pool.getConnection(function (err, connection) {
        var sql = "select * from student where fp = ?";
        connection.query(sql, [fp], function (err, rows) {
            if (err) console.error("err : " + err);
            s_num = rows[0].s_num;
            console.log(s_num);
            var sql = "insert into attendance_time values('', ?, now(), null);";
            connection.query(sql, [s_num], function (err, rows) {
                if (err) console.error("err : " + err);
                console.log("rows : " + JSON.stringify(rows));
            });
        });
        connection.release();
        res.redirect('/');
    });
});

router.get('/atdTimeEnd', function (req, res, next) {
    var s_num = req.session.user[0].s_num;
    pool.getConnection(function (err, connection) {
        var sql = "update attendance_time set atd_end_time = now() where s_num = ? and atd_end_time is null;";
        connection.query(sql, [s_num], function (err, rows) {
            if (err) console.error("err : " + err);
            console.log("rows : " + JSON.stringify(rows));
        });
        connection.release();
        res.redirect('/users/logout');
    });
});




module.exports = router;
