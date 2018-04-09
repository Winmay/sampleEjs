var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('static-favicon');
var bodyParser = require('body-parser');
var session = require('express-session');

var indexRouter = require('./routes/index');
var reg = require('./routes/reg');			//注册页
var login = require('./routes/login');		//登录页
var logout = require('./routes/logout');	//安全退出

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//这里传入了一个密钥加session id
app.use(cookieParser('Wilson'));
//使用靠就这个中间件
app.use(session({ 
	secret: 'wilson',
	resave: false,
	saveUninitialized:true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/reg', reg);
app.use('/login', login);
app.use('/logout', logout);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


app.listen(8000);

module.exports = app;
