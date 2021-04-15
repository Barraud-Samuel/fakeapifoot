const express = require('express')
var path = require('path');
var logger = require('morgan');
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');
const handlebarsHelpers = require('./helpers/handlebars');
const mongoose = require('mongoose');
const db = require('./db');

var routes = require('./routes/index');
var {authRoutes,authTokens} = require('./routes/auth');

const app = express()

// view engine setup
app.engine('hbs', hbs({
  extname: 'hbs', 
  defaultLayout: 'layout', 
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/',
  helpers: handlebarsHelpers
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  const authToken = req.cookies['AuthToken'];
  console.log(authTokens[authToken]);
  req.user = authTokens[authToken];
  next();
});

app.use('/', routes);
app.use('/auth',authRoutes)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))