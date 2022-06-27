import _events from './chats-events';
export const events = _events;
var ChatsModule;

async function model() {
    if (ChatsModule) return ChatsModule;
    console.log(process.env.CHATS_MODEL);
    ChatsModule = await import(`../models/chats-${process.env.CHATS_MODEL}`).catch((error) => {
        console.log(error);
        process.exit(1);
    });
    return ChatsModule;
}

export async function create(owner,user) { 
    const chat = (await model()).create(owner,user);
    _events.chatCreated(chat);
    return chat; 
}

export async function read(owner,user) { return (await model()).read(owner,user); }

export async function destroy(owner,user) { 
    (await model()).destroy(owner,user);
    _events.chatDestroy({user});
    return user;
}

export async function keylist() { return (await model()).keylist(); }
export async function count(user) { return (await model()).count(user); }
export async function close() { return (await model()).close(); }