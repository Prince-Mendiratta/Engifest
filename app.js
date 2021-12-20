const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');

// Configure dotenv
require('dotenv').config({
  path: './config/config.env'
})
const connectDB = require('./config/db');

const indexRouter = require('./routes/index');
const dashboardRouter = require('./routes/dashboard');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const signoutRouter = require('./routes/signout');
const ticketRouter = require('./routes/api/ticket')
const authRouter = require('./routes/api/auth');

const app = express();

connectDB();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// body parser
app.use(bodyParser.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/signout', signoutRouter);
app.use('/api', authRouter);
app.use('/api', ticketRouter);

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
  res.render('error');
});

module.exports = app;
