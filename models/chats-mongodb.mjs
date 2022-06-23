import fs from 'fs-extra';
import path from 'path';
import util from 'util';
import Chat from './Chat';
import mongodb from 'mongodb';
const MongoClient = mongodb.MongoClient;
import DBG from 'debug';
const debug = DBG('chats:chats-mongodb');
const error = DBG('chats:error-mongodb');


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

export async function create(user) {
    const { db, client } = await connectDB();
    const note = new Chat(user);
    const collection = db.collection('chats');
    await collection.insertOne({
        user: user
    });
    return note;
}


export async function read(user) {
    const { db, client } = await connectDB();
    const collection = db.collection('chats');
    const doc = await collection.findOne({ user:user });
    const chat = new Chat(doc.user);
    return chat;
}

export async function destroy(user) {
    const { db, client } = await connectDB();
    const collection = db.collection('chats');
    await collection.findOneAndDelete({ user:user });
}

export async function keylist() {
    const { db, client } = await connectDB();
    const collection = db.collection('chats');
    const keyz = await new Promise((resolve, reject) => {
        var keyz = [];
        collection.find({}).forEach(
            chat => { keyz.push(chat.user); },
            err => {
                if (err) reject(err);
                else resolve(keyz);
            }
        );
    });
    return keyz;
}

export async function count() {
    const { db, client } = await connectDB();
    const collection = db.collection('chats');
    const count = await collection.count({});
    return count;
}

export async function close() {
    if (client) client.close();
    client = undefined;
}