const _user = Symbol('user');
const _message = Symbol('message');

module.exports = class Chat {
    constructor(user,message) {
        this[_user] = user;
        this[_message] = message;
    }

    get user() { return this[_user]; }
    get message() { return this[_message]; }
};