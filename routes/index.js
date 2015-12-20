var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

    if (req.session.user) {
        console.log("member grade: "+req.session.grade);
        //console.log(req.session.user);
        pool.getConnection(function (err, conn) {
            conn.query("select N.script_num as nid, N.title as title, N.reg_date as reg_date, A.admin_name as writer from notice N, admin A where N.admin_num=A.admin_num  order by reg_date desc", function (err, rows) {
                if (err) console.log("err:" + err);
                console.log(JSON.stringify(rows));
                res.render('page/noticeList', {
                    title: '공지사항',
                    rows: rows,
                    name: req.session.user[0].admin_name,
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
                    name: req.session.user[0].admin_name,
                    mode: req.session.grade
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
        var sql = "select * from personal_schedule where psn_sche_hd_date is null";
        pool.getConnection(function (err, conn) {
            conn.query(sql, function (err, rows) {
                res.render('page/scheduleReq', {
                    title: '스케줄현황',
                    rows: rows,
                    name: req.session.user[0].admin_name,
                    mode: req.session.grade
                });
            });
            conn.release();
        });
    } else {
        res.render('login');
    }
});

router.get('/scheduleReq/:s_num/:psn_sche_rq_date/:accept_op', function (req, res, next) {
    if (req.session.user) {
        var s_num = req.params.s_num;
        var psn_sche_rq_date = req.params.psn_sche_rq_date;
        var accept_op = req.params.accept_op;
        var date = new Date();
        var phdDate = [date, accept_op, s_num, psn_sche_rq_date];
        pool.getConnection(function (err, conn) {
            var sql = "update personal_schedule set psn_sche_hd_date = ?, accept_op = ? where s_num = ? and psn_sche_rq_date = ?";
            conn.query(sql, phdDate, function (err, rows) {
                if(err) console.log("err : "+ err);
                res.redirect('/scheduleReq');
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
                    name: req.session.user[0].admin_name,
                    mode: req.session.grade
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
                    name: req.session.user[0].admin_name,
                    mode: req.session.grade
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
            title: '공식스케줄등록',
            name: req.session.user[0].admin_name,
            mode: req.session.grade
        });
    } else {
        res.render('login');
    }
});

router.post('/offScheduleAdd', function (req, res, next) {
    if (req.session.user) {
        var sche_name = req.body.sche_name,
            ofc_sche_start_date = req.body.ofc_sche_start_date,
            ofc_sche_end_date = req.body.ofc_sche_end_date,
            ofc_sche_start_time = req.body.ofc_sche_start_time,
            ofc_sche_end_time = req.body.ofc_sche_end_time,
            date = new Date();
        var scheduleData = [req.session.user[0].admin_num, sche_name, ofc_sche_start_date, ofc_sche_end_date, ofc_sche_start_time, ofc_sche_end_time, date];
        //var stuScheData = [s_num, date, enter_out_sit]; 학생추가 아직 안됨@@
        pool.getConnection(function (err, connection) {
            var sql = "insert into official_schedule values('', ?, ?, ?, ?, ?, ?, ?);";
            connection.query(sql, scheduleData, function (err, rows) {
                if (err) console.error("err : " + err);
                console.log("rows : " + JSON.stringify(rows));
            });
            res.redirect('/offScheduleList');
            connection.release();
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
                    name: req.session.user[0].admin_name,
                    mode: req.session.grade
                });
            });
            conn.release();
        });
    } else {
        res.render('login');
    }
});


router.get('/sitAdd', function (req, res, next) {
    if (req.session.user) {
        res.render('page/sitAdd', {
            title: '학생자리등록',
            name: req.session.user[0].admin_name,
            mode: req.session.grade
        });
    } else {
        res.render('login');
    }
});

router.post('/sitAdd', function (req, res, next) {
    if (req.session.user) {
        var s_num = req.body.s_num,
            grade = req.body.grade,
            s_name = req.body.s_name,
            s_pw = req.body.s_pw,
            major_num = req.body.major_num,
            fp = req.body.fp,
            phone = req.body.phone,
            email = req.body.email,
            enter_out_sit = req.body.enter_out_sit,
            p_num = req.body.p_num,
            lab_num = req.body.lab_num,
            date = new Date();
        var studentData = [s_num, lab_num, p_num, major_num, s_pw, grade, s_name, email, phone, fp];
        var enterOutData = [s_num, date, enter_out_sit];
        pool.getConnection(function (err, connection) {
            var sql = "insert into student values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'S');";
            connection.query(sql ,studentData, function (err, rows) {
                if (err) console.error("err : " + err);
                console.log("rows : " + JSON.stringify(rows));
            });
            var sql = "insert into enter_out_career values(?, ?, null, ?, null, null, null, null, null);";
            connection.query(sql ,enterOutData, function (err, rows) {
                if (err) console.error("err : " + err);
                console.log("rows : " + JSON.stringify(rows));
            });
            res.redirect('/sitAdd');
            connection.release();
        });
    } else {
        res.render('login');
    }
});

router.get('/enterOutList', function (req, res, next) {
    if (req.session.user) {
        pool.getConnection(function (err, conn) {
            var sql = "select * from enter_out_career e, student s where e.s_num = s.s_num and enter_hd_date is null";
            conn.query(sql, function (err, rows) {
                res.render('page/enterOutList', {
                    title: '입실대기자관리',
                    rows: rows,
                    name: req.session.user[0].admin_name,
                    mode: req.session.grade
                });
            });
            conn.release();
        });
    } else {
        res.render('login');
    }
});

router.post('/enterOutList/:s_num', function (req, res, next) {
    if (req.session.user) {
        var pjr_num = req.body.pjr_num;
        var sit_num = req.body.sit_num;
        var s_num = req.params.s_num;
        var date = new Date();
        var sitUpData = [s_num, sit_num, pjr_num];
        console.log(sitUpData);
        pool.getConnection(function (err, conn) {
            var sql = "update sit set s_num = ? where sit_num = ? and pjr_num = ?;";
            conn.query(sql, sitUpData, function (err, rows) {
                console.log(rows);
            });
            var sql = "update student set state = 'I' where s_num = ?;";
            conn.query(sql, s_num, function (err, rows) {
                console.log(rows);
            });
            var sql = "update enter_out_career set enter_hd_date = ? where s_num = ?;";
            conn.query(sql, [date, s_num], function (err, rows) {
                console.log(rows);
            });
            res.redirect('/enterOutList');
            conn.release();
        });
    } else {
        res.render('login');
    }
});

router.get('/outReqList', function (req, res, next) {
    if (req.session.user) {
        pool.getConnection(function (err, conn) {
            var sql = "select * from enter_out_career e, student s where e.s_num = s.s_num and out_rq_date is not null and out_hd_date is null";
            conn.query(sql, function (err, rows) {
                res.render('page/outReqList', {
                    title: '퇴실대기자관리',
                    rows: rows,
                    name: req.session.user[0].admin_name,
                    mode: req.session.grade
                });
            });
            conn.release();
        });
    } else {
        res.render('login');
    }
});

router.get('/outReqList/:s_num/:enter_rq_date', function (req, res, next) {
    if (req.session.user) {
        var s_num = req.params.s_num,
            enter_rq_date = req.params.enter_rq_date,
            date = new Date();
        var eoUpdata = [date, s_num, enter_rq_date];
        pool.getConnection(function (err, conn) {
            var sql = "update enter_out_career set out_hd_date = ?, fc_out_op = 'N' where s_num = ? and enter_rq_date = ?";
            conn.query(sql, eoUpdata, function (err, rows) {
                console.log("err : " + err);
            });
            var sql = "update student set state = 'O' where s_num = ?";
            conn.query(sql, [s_num], function (err, rows) {
                console.log("err : " + err);
            });
            res.redirect('/outReqList');
            conn.release();
        });
    } else {
        res.render('login');
    }
});

router.get('/scheduleInsert', function (req, res, next) {
    res.render('page/timeInsert', {
        title: '시간표등록',
        name: req.session.user[0].admin_name,
        mode: req.session.grade
    });
});

module.exports = router;
