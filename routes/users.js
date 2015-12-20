var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    if (req.session.user)
        res.send(req.session.user[0]);
    else
        res.redirect('/');
});

router.post('/login', function (req, res, next) {
    var id = req.body.mId;
    var pw = req.body.mPw;
    var count = 1;
    pool.getConnection(function (err, connection) {
        var sql = "select *, count(*) cnt from student where s_num=? and s_pw=?";
        connection.query(sql, [id, pw], function (err, rows) {
            count++;
            if (err) console.log("Error: " + err);
            if (rows[0].cnt === 1) {
                req.session.user = rows;
                req.session.grade = "student";
                res.redirect('/');
            }
        });
        var sql = "select *, count(*) cnt from professor where p_num=? and p_pw=?";
        connection.query(sql, [id, pw], function (err, rows) {
            count++;
            if (err) console.log("Error: " + err);
            if (rows[0].cnt === 1) {
                req.session.user = rows;
                req.session.grade = "professor";
                res.redirect('/');
            }
        });
        var sql = "select *, count(*) cnt from admin where admin_num=? and admin_pw=?";
        connection.query(sql, [id, pw], function (err, rows) {
            count++;
            if (err) console.log("Error: " + err);
            if (rows[0].cnt === 1) {
                req.session.user = rows;
                req.session.grade = "admin";
                res.redirect('/');
                //res.end(ejs.render(data, {data: rows}));
            }
        });
        connection.release();
    });
});

router.get('/logout', function (req, res, next) {
    delete req.session.user;
    res.redirect('/');
});

module.exports = router;
