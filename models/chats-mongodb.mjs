import fs from 'fs-extra';
import path from 'path';
import util from 'util';
import Chat from './Chat';
import mongodb from 'mongodb';
import * as usersModel from '../models/users-superagent';
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

export async function create(owner, user) {
    const { db, client } = await connectDB();
    const note = new Chat(owner, user);
    const collection = db.collection('chats');
    await collection.insertOne({
        user: user, owner: owner
    });
    return note;
}


export async function read(owner,user) {
    const { db, client } = await connectDB();
    const collection = db.collection('chats');
    const doc = await collection.findOne({ owner:owner, user:user });
    if(doc){
        const chat = new Chat(doc.owner,doc.user);
        return chat;
    }
    else{
        return null;
    }
}

export async function destroy(owner,user) {
    const { db, client } = await connectDB();
    const collection = db.collection('chats');
    await collection.findOneAndDelete({ user:user });
}

export async function keylist() {
    var userlist = await usersModel.listUsers();

    var keyz = [];
    userlist.forEach(
        chat => { keyz.push(chat.username); },
        err => {
            if (err) reject(err);
            else resolve(keyz);
        }
    );
    
    console.log(keyz);
    return keyz;
}

export async function count(owner) {
    const { db, client } = await connectDB();
    const collection = db.collection('chats');
    const count = await collection.count({owner:owner});
    return count;
}

export async function close() {
    if (client) client.close();
    client = undefined;
}