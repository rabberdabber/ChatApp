const _user = Symbol('user');
const _message = Symbol('message');

export default class Chat {
    constructor(user,message) {
        this[_user] = user;
        this[_message] = message;
    }

    get user() { return this[_user]; }
    get message() { return this[_message]; }
    set message(newMessage) { this[_message] = newMessage; }

    get JSON() {
        return JSON.stringify({
           user:this.user, message:this.message
        });
    }

    static fromJSON(json) {
        var data = JSON.parse(json);
        var chat = new Chat(data.user,data.message);
        return chat;
    }
}