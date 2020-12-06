var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { Sequelize, DataTypes } = require('sequelize');

require('dotenv').config()

var indexRouter = require('./routes/index');
var auth = require('./routes/auth');
var note = require('./routes/note')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/auth', auth);
app.use('/note', note);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).send("что-то пошло не так");

});

//setup sequilize
const sequelize = new Sequelize('db', 'name', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

(async () => {
    try 
  {

    await sequelize.authenticate();
    console.log('Connection with psql has been established successfully.');
  } 
  catch (error) {
    console.log(error)
  }
}
)();

module.exports = app;
