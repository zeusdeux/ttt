var logger     = require('morgan');
var express    = require('express');
var bodyParser = require('body-parser');

var routes     = require('./routes/index');

var app        = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');

  err.status = 404;
  next(err);
});

// error handlers
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.send(err);
});


module.exports = app;
