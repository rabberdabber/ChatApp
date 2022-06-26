const _user = Symbol('user');
const _owner = Symbol('owner');


export default class Chat {
    constructor(user) {
        this[_user] = user;
        this[_owner] = owner;
    }

    get user() { return this[_user]; }
    get owner() { return this[_owner]; }

    get JSON() {
        return JSON.stringify({
           user:this.user, owner:this.owner
        });
    }

    static fromJSON(json) {
        var data = JSON.parse(json);
        var chat = new Chat(data.owner,data.user);
        return chat;
    }
}