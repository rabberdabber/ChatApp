import path from 'path';
import util from 'util';
import express from 'express';
import passport from 'passport';
import passportTwitter from 'passport-twitter';
const TwitterStrategy = passportTwitter.Strategy;
import passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;
import * as usersModel from '../models/users-superagent';
import { sessionCookieName } from '../app';

export const router = express.Router();

import DBG from 'debug';
import flash from 'express-flash';
const debug = DBG('notes:router-users');
const error = DBG('notes:error-users');

export function initPassport(app) {
    app.use(passport.initialize());
    app.use(passport.session());
}

export function ensureAuthenticated(req, res, next) {
    try {
        // req.user is set by Passport in the deserialize function 
        if (req.user) next();
        else res.redirect('/users/login');
    } catch (e) {
        error(`ensureAuthenticated ERROR ${e.stack}`);
        next(e);
    }
}


router.get('/signup', async (req, res, next) => {
    try {
        res.render('signup',{ message: req.flash('message')});
    } catch (e) { next(e); }
});


router.post('/signup', async(req, res, next) => {
    try{
        var user = await usersModel.find(req.body.username);
        if(user != null){
            req.flash('message',"User with the same username already exists!");
            res.redirect('/');
            return;
        }

        if(req.body.password1 != req.body.password2){
           req.flash('message',"passwords does not match, registration failed!");
           res.redirect('/users/signup');
           return;
        }
        var user = await usersModel.findOrCreate({
            id: req.body.username, password: req.body.password1, provider: "local",
            familyName: req.body.username , givenName: req.body.username, middleName: "",
            emails: [req.body.email], photos: []
        });
        var lst = usersModel.listUsers();
        console.log(lst);
        res.redirect('/users/login');
    } catch(e) { next(e); }
})

router.get('/login', function (req, res, next) {
    try {
        res.render('login', {
            title: "Login to Chats",
            user: req.user, message: req.flash('message')}
        );
    } catch (e) {
        req.flash('message','Username or Password does not match!')
        res.redirect('/');
        return;
    }
});

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/main',     // SUCCESS: Go to home page 
        failureRedirect: 'login', // FAIL: Go to /user/login 
        failureFlash: true,
        failureFlash: 'Username does not match the given Password!'
    })
);

router.get('/logout', function (req, res, next) {
    try {
        if(req.session){
            debug(`/logout`);
            req.session.destroy();
            res.clearCookie(sessionCookieName);
            res.redirect('/');
        }

    } catch (e) {
        error(`/logout ERROR ${e.stack}`);
        next(e);
    }
});

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            debug(`userPasswordCheck(${username}, ${password})`);
            var check = await usersModel.userPasswordCheck(username, password);
            if(check == null){
                
                done(null,false);
                return;
            }
            if (check.check) {
                debug(`userPasswordCheck shows good user ${util.inspect(check)}`);
                done(null, {
                    id: check.username,
                    username: check.username
                });
            } else {
                debug(`userPasswordCheck shows BAD user ${util.inspect(check)}`);
                done(null, false, check.message);
            }
        } catch (e) {
            error(`userPasswordCheck shows ERROR ${e.stack}`);
            done(e);
        }
    }
));

passport.use(new TwitterStrategy({
    consumerKey: "V5oBDLJOGsC7QztZlRqAk8sI4",
    consumerSecret: "0Vc1HHUEY3a4YYYfNJDFHPOiljruKMTiecHYyAufxN2Mc0Gxbm",
    callbackURL: "http://MacBook-Pro-4.local:3000/users/auth/twitter/callback"
},
    async function (token, tokenSecret, profile, done) {
        try {
            done(null, await usersModel.findOrCreate({
                id: profile.username, username: profile.username, password: "", provider: profile.provider, familyName: profile.displayName, givenName: "", middleName: "", photos: profile.photos, emails: profile.emails
            }));
        } catch (err) { done(err); }
    }));

router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
        successRedirect: '/',
        failureRedirect: '/users/login'
    }));

passport.serializeUser(function (user, done) {
    try {
        done(null, user.username);
    } catch (e) {
        error(`serializeUser ERROR ${e.stack}`);
        done(e);
    }
});

passport.deserializeUser(async (username, done) => {
    try {
        var user = await usersModel.find(username);
        done(null, user);
    } catch (e) {
        error(`deserializeUser ERROR ${e.stack}`);
        done(e);
    }
}); 

