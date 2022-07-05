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

import { socketio as indexSocketio, router as index } from './routes/index';
import {router as users, initPassport } from './routes/users';
import { socketio as chatSocketio,router as chats } from './routes/chats';

import http from 'http';
import passportSocketIo from 'passport.socketio';
import session from 'express-session';
import flash from 'express-flash';
import sessionFileStore from 'session-file-store';
const FileStore = sessionFileStore(session);
export const sessionCookieName = 'chatscookie.sid';
const sessionSecret = 'rabberdabber';

const sessionStore = new FileStore({
    path: process.env.NOTES_SESSIONS_DIR ?
        process.env.NOTES_SESSIONS_DIR : "sessions"
}); 

// Workaround for lack of __dirname in ES6 modules
import dirname from './dirname.js';
const { __dirname } = dirname;

const app = express();
export default app;
const server = http.createServer(app);
import socketio from 'socket.io';
const io = socketio(server);

io.use(passportSocketIo.authorize({
    cookieParser: cookieParser,
    key: sessionCookieName,
    secret: sessionSecret,
    store: sessionStore
}));


var port = normalizePort(process.env.PORT || '3000');
app.set('port',port);

const hostname = '0.0.0.0';
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
server.on('error',onError);
server.on('listening',onListening);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'partials'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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


app.use(session({
    store: new FileStore({ path: "sessions" }),
    secret: 'keyboard mouse',
    resave: true,
    saveUninitialized: true,
    name: sessionCookieName
}));
initPassport(app);

app.use(flash());

app.use('/', index);
app.use('/main',index);

app.use('/users', users); 
app.use('/chats', chats);

indexSocketio(io);
chatSocketio(io);


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

function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) { // named pipe
        return val;
    }
    if (port >= 0) { // port number
        return port;
    }
    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') { throw error; }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' +
        port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
}