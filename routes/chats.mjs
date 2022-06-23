
import util from 'util';
import express from 'express';
import * as chats from '../models/chats';
import * as messages from '../models/messages-mongodb';
import { ensureAuthenticated } from './users';

export const router = express.Router();

import DBG from 'debug';
const debug = DBG('chats:router-users');
const error = DBG('chats:error-chats'); 

// Add Chats. (create)
router.get('/add', ensureAuthenticated,(req, res, next) => {
    res.render('chatedit', {
        title: "Add a Chat",
        docreate: true,
        user: req.user, chat: undefined
    });
});

// Save Chat (update)
router.post('/save',ensureAuthenticated, async(req, res, next) => {
    try {
        var chat;
        if (req.body.docreate === "create") {
            chat = await chats.create(req.body.user,
                "");
        } else {
            chat = await chats.update(req.body.user,
                "");
        }
        res.redirect('/chats/view?user=' + req.body.user);
    } catch (e) {
        error(`/save ERROR ${e.stack}`);
        next(e);
    }
});

// Read Chat (read)
router.get('/view', async(req, res, next) => {
    var chat = await chats.read(req.query.user);
    res.render('chatview', {
        user: req.query.user ,
        username: req.user ? req.user: undefined,
        chat: chat
    });
});


// Ask to Delete Chat (destroy)
router.get('/destroy', ensureAuthenticated, async(req, res, next) => {
    var chat = await chats.read(req.query.user);
    res.render('chatdestroy', {
        user: req.query.user,
        username: req.user ? req.user : undefined, 
        chat: chat
    });
});

// Really destroy chat (destroy)
router.post('/destroy/confirm', ensureAuthenticated, async(req, res, next) => {
    await chats.destroy(req.body.user);
    res.redirect('/');
});

// Save incoming message to message pool, then broadcast it 
router.post('/write-message', ensureAuthenticated, async (req, res, next) => {
    try {
        await messages.create(req.body.from,
            req.body.to, req.body.message);
        res.status(200).json({});
    } catch (err) {
        res.status(500).end(err.stack);
    }
});

// Delete the indicated message 
router.post('/del-message', ensureAuthenticated, async (req, res, next) => {
    try {
        await messages.destroyMessage(req.body.to);
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
        socket.on('getchatmessages', (namespace, cb) => {
            debug('getchatmessages ' + namespace);
            messages.recentMessages(namespace)
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