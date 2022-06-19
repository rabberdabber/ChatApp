'use strict';

const util = require('util');
const chat = require('./Chat');

var chats = [];

exports.update = exports.create = async function(user,message) {
    chats[user] = new chat(user,message);
    return chats[user];
};

exports.read = async function(user) {
    if (chats[user]) return chats[user];
    else throw new Error(`chat ${user} does not exist`);
};

exports.destroy = async function(user) {
    if (chats[user]) {
        delete chats[user];
    } else throw new Error(`chat ${user} does not exist`);
};

exports.keylist = async function() {
    return Object.keys(chats);
};

exports.count = async function() {
    return chats.length;
};

exports.count = async function() {}