var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require("mysql");
var moment = require("moment");
var ejs = require("ejs");
var engine = require('ejs-locals');


pool = mysql.createPool({
    connectionLimit:5,
  host:"::1",
  user:"root",
  password:"",
  database:"dbs"
});
session = require("express-session");

var routes = require('./routes/index');
var users = require('./routes/users');
var student = require('./routes/student');
var professor = require('./routes/professor');

var app = express();

app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {sercure: true}
}));

app.locals.formatDates = function(date) {
    return moment(date).format('YYYY. MM. DD.');
}
app.locals.formatDateTimes = function(date) {
    return moment(date).format('YYYY. MM. DD.  hh:mm:ss');
}
app.locals.formatDB= function(date) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
}

app.engine('ejs', engine);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/student', student);
app.use('/professor', professor);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
