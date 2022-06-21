import express from 'express';
import * as chats from '../models/chats'
import util from 'util';

export const router = express.Router();

/* GET home page. */
router.get('/', async(req, res, next) => {
    let keylist = await chats.keylist();
   
    let keyPromises = keylist.map(user => {
        return chats.read(user)
    });
    let chatlist = await Promise.all(keyPromises);
   
    res.render('index', { chatlist: chatlist });
});

