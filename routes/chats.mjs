
import util from 'util';
import express from 'express';
import * as chats from '../models/chats';
import * as messages from '../models/messages-mongodb';
import { ensureAuthenticated } from './users';
import * as usersModel from '../models/users-superagent';


export const router = express.Router();

import DBG from 'debug';
const debug = DBG('chats:router-users');
const error = DBG('chats:error-chats'); 


router.post('/search',ensureAuthenticated, async(req, res, next) => {
    try{
        var user = await usersModel.find(req.body.user);
        console.log(user);
        if(user){
            res.redirect('/chats/view?user=' + req.body.user);
        }
        else{
            req.flash('message',"No such User found!");
            res.redirect('/main');
        }
    } catch(e){
        req.flash('message',"No such User found!");
        next(e);    
        res.redirect('/main');
    }
});


// Read Chat (read)
router.get('/view', async(req, res, next) => {
    let chatlist = await chats.keylist();
    res.render('chatview', {
        peer: req.query.user ,
        user: req.user ? req.user: undefined,
        chatlist: chatlist
    });
});


// Save incoming message to message pool, then broadcast it 
router.post('/write-message', ensureAuthenticated, async (req, res, next) => {
    try {
        console.log(req.body.message);
        if(req.body.message != ""){
            await messages.create(req.body.from,
                req.body.to, req.body.message);
        }
        res.status(200).json({});
    } catch (err) {
        res.status(500).end(err.stack);
    }
});

// Delete the indicated message 
router.post('/del-message', ensureAuthenticated, async (req, res, next) => {
    try {
        console.log(req.body.id);
        await messages.destroyMessage(req.body.id);
        res.status(200).json({});
    } catch (err) {
        res.status(500).end(err.stack);
    }
});

export function socketio(io) {
    io.of('/view').on('connection', function (socket) {
        // 'cb' is a function sent from the browser, to which we
        // send the messages for the named note.
        debug(`/view connected on ${socket.id}`);
        socket.on('getchatmessages', (message, cb) => {
            debug('getchatmessages ' + message.user);
            messages.recentMessages(message.username,message.user)
                .then(cb)
                .catch(err => console.error(err.stack));
        });
    });

    messages.emitter.on('newmessage', newmsg => {
        io.of('/view').emit('newmessage', newmsg);
    });
    messages.emitter.on('destroymessage', data => {
        io.of('/view').emit('destroymessage', data);
    });
    chats.events.on('chatupdate', newchat => {
        io.of('/view').emit('chatupdate', newchat);
    });
    chats.events.on('chatdestroy', data => {
        io.of('/view').emit('chatdestroy', data);
    });
};