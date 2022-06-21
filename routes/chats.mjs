
import util from 'util';
import express from 'express';
import * as chats from '../models/chats';

export const router = express.Router();


// Add Chats. (create)
router.get('/add', (req, res, next) => {
    res.render('chatedit', {
        title: "Add a Chat",
        docreate: true,
        chat: undefined
    });
});

// Save Chat (update)
router.post('/save', async(req, res, next) => {
    var chat;
    if (req.body.docreate === "create") {
        chat = await chats.create(req.body.user,
            req.body.message);
    } else {
        chat = await chats.update(req.body.user,
            req.body.message);
    }
    res.redirect('/chats/view?user=' + req.body.user);
});

// Read Chat (read)
router.get('/view', async(req, res, next) => {
    var chat = await chats.read(req.query.user);
    res.render('chatview', {
        user: req.query.user,
        chat: chat
    });
});


// Ask to Delete Chat (destroy)
router.get('/destroy', async(req, res, next) => {
    var chat = await chats.read(req.query.user);
    res.render('chatdestroy', {
        user: req.query.user,
        chat: chat
    });
});

// Really destroy chat (destroy)
router.post('/destroy/confirm', async(req, res, next) => {
    await chats.destroy(req.body.user);
    res.redirect('/');
});