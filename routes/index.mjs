import express from 'express';
import * as chats from '../models/chats'
import util from 'util';

export const router = express.Router();

import DBG from 'debug';
const debug = DBG('chats:debug-index');
const error = DBG('chats:error-index'); 

async function getList() {
    const keylist = await chats.keylist();
    var keyPromises = keylist.map(key => {
        return chats.read(key).then(chat => {
            return { user: chat.user };
        });
    });
    return Promise.all(keyPromises);
};

router.get('/', async (req, res, next) => {
    try {
        let chatlist = await getList();
        res.render('index', {
            chatlist: chatlist,
            user: req.user ? req.user : undefined
        });
    } catch (e) { next(e); }
});

export function socketio(io) {
    var emitChat = async () => {
        const chatlist = await getList();
        debug(`socketio emitChat ${util.inspect(chatlist)}`);
        io.of('/home').emit('chatMessages', { chatlist });
    };
    chats.events.on('chatcreated', emitChat);
    chats.events.on('chatupdate', emitChat);
    chats.events.on('chatdestroy', emitChat);
}; 
