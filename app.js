const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('./modules/authentication/passport.config');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());

// routes
app.use('/user', require('./modules/user/user.routes.js'));
app.use('/authenticate', require('./modules/authentication/authentication.routes.js'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    console.log(err);
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.send({error: 'error'});
});

module.exports = app;
