import mongodb from 'mongodb';
import fs from 'fs-extra';
import util from 'util';
import EventEmitter from 'events';

class MessagesEmitter extends EventEmitter { }
const MongoClient = mongodb.MongoClient;

import DBG from 'debug';
import Message from './Message.mjs';
const debug = DBG('chats:model-messages');
const error = DBG('chats:error-messages'); 

export const emitter = new MessagesEmitter();

var client;

async function connectDB() {
    if (!client) client = await MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).catch((error) => {
        console.log("couldn't connect to mongodb");
        process.exit(2);
    });
    return {
        db: client.db(process.env.MONGO_DBNAME),
        client: client
    };
}

export async function create(from, namespace, message) {
    const {db, client} = await connectDB();

   
    const collection = db.collection('messages');
    const time = new Date();
    const doc = await collection.insertOne({
        from: from, to: namespace, message: message, timestamp: time
    });
   
    const msg = new Message(doc.insertedId,from, namespace, message,time);
   
    var toEmit = {
        id: msg.id,
        from: msg.from,
        to: msg.to,
        message: msg.message,
        timestamp: msg.timestamp
    };

    emitter.emit('newmessage', toEmit);
}

export async function destroyMessage(id) {
    const {db, client} = await connectDB();
    const collection = db.collection('messages');
    (await collection.findOneAndDelete({ id:id}))
    .catch((error) => {
       console.log("couldn't destroy the message with id ",id);
    });
   
    emitter.emit('destroymessage', {id})
    
}

export async function recentMessages(from,to) {
    const {db, client} = await connectDB();
    const collection = db.collection('messages');

    const keyz = await new Promise((resolve, reject) => {
        var keyz = [];
        collection.find({ $or: [
            {from:from , to:to},
            {from:to, to:from}
        ] }).sort({timestamp:-1}).limit(20).forEach(
            msg => {
                keyz.push({
                    from: msg.from,
                    to: msg.to,
                    message: msg.message,
                    timestamp: msg.timestamp
                }); },
            err => {
                if (err) reject(err);
                else resolve(keyz);
            }
        );
    });

    return keyz;
}