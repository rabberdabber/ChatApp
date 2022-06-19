const express = require('express');
const router = express.Router();
const chats = require('../models/chat-memory');
const util = require('util');

/* GET home page. */
router.get('/', async(req, res, next) => {
    let keylist = await chats.keylist();
   
    let keyPromises = keylist.map(user => {
        return chats.read(user)
    });
    let chatlist = await Promise.all(keyPromises);
   
    res.render('index', { chatlist: chatlist });
});

module.exports = router;