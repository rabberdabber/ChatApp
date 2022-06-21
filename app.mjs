import fs from 'fs-extra';
import url from 'url';
import express from 'express';
import hbs from 'hbs';
import path from 'path';
import util from 'util';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import DBG from 'debug';
const debug = DBG('chats:debug');
const error = DBG('chats:error');

import { router as index } from './routes/index';
// const users = require('./routes/users');
import { router as chats } from './routes/chats';

// Workaround for lack of __dirname in ES6 modules
import dirname from './dirname.js';
const { __dirname } = dirname;
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'partials'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets/vendor/bootstrap', express.static(
    path.join(__dirname, 'node_modules', 'bootstrap', 'dist')));
app.use('/assets/vendor/font-awesome', express.static(
    path.join(__dirname, 'node_modules', 'font-awesome')));
app.use('/assets/vendor/jquery', express.static(
    path.join(__dirname, 'node_modules', 'jquery','dist')));
app.use('/assets/vendor/popper.js', express.static(
    path.join(__dirname, 'node_modules', 'popper.js', 'dist')));
app.use('/assets/vendor/feather-icons', express.static(
    path.join(__dirname, 'node_modules', 'feather-icons', 'dist')));
app.use('/assets/vendor/font-awesome', express.static(
    path.join(__dirname, 'node_modules', 'font-awesome', 'dist')));
app.use('/assets/vendor/fontawesome', express.static(
    path.join(__dirname, 'node_modules', '@fortawesome', 'fontawesome-free')));
app.use('/assets/vendor/fileinput', express.static(
    path.join(__dirname, 'node_modules', 'jquery-fileinput')));


app.use('/', index);
// app.use('/users', users); 
app.use('/chats', chats);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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

export default app;