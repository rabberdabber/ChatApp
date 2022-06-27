import express from 'express';
import * as chats from '../models/chats'
import util from 'util';
import { ensureAuthenticated } from './users';

export const router = express.Router();

import DBG from 'debug';
const debug = DBG('chats:debug-index');
const error = DBG('chats:error-index'); 


router.get('/main',ensureAuthenticated, async(req, res, next) => {
    try {
        let chatlist = await chats.keylist();
        res.render('index', {
            chatlist: chatlist,
            user: req.user ? req.user : undefined
            , message: req.flash('message')
        });
    } catch (e) { next(e); }
});

router.get('/', async (req, res, next) => {
    try {
        res.render('login',{message: req.flash('message')});
    } catch (e) { next(e); }
});


export function socketio(io) {
    var emitChat = async () => {
        const chatlist = await chats.keylist();
        debug(`socketio emitChat ${util.inspect(chatlist)}`);
        io.of('/home').emit('chatlists', { chatlist });
    };
    chats.events.on('chatcreated', emitChat);
    chats.events.on('chatupdate', emitChat);
    chats.events.on('chatdestroy', emitChat);
}; 
