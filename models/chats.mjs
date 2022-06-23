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

export async function create(user) { 
    const chat = (await model()).create(user);
    _events.chatCreated(chat);
    return chat; 
}

export async function read(user) { return (await model()).read(user); }
export async function destroy(user) { 
    (await model()).destroy(user);
    _events.chatDestroy({user});
    return user;
}
export async function keylist() { return (await model()).keylist(); }
export async function count() { return (await model()).count(); }
export async function close() { return (await model()).close(); }