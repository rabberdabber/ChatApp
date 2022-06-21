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

export async function create(user,message) { return (await model()).create(user,message); }
export async function update(user,message) { return (await model()).update(user,message); }
export async function read(user) { return (await model()).read(user); }
export async function destroy(user) { return (await model()).destroy(user); }
export async function keylist() { return (await model()).keylist(); }
export async function count() { return (await model()).count(); }
export async function close() { return (await model()).close(); }