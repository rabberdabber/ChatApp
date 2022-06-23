const _user = Symbol('user');


export default class Chat {
    constructor(user) {
        this[_user] = user;
    }

    get user() { return this[_user]; }

    get JSON() {
        return JSON.stringify({
           user:this.user
        });
    }

    static fromJSON(json) {
        var data = JSON.parse(json);
        var chat = new Chat(data.user);
        return chat;
    }
}