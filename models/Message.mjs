const _from = Symbol('from');
const _to = Symbol('to');
const _message = Symbol('message');
const _timestamp = Symbol('timestamp');
const _id = Symbol('id');

export default class Message {
    constructor(id,from,to,message,timestamp) {
        this[_id] = id;
        this[_from] = from;
        this[_to] = to;
        this[_message] = message;
        this[_timestamp] = timestamp;
    }

    get id() { return this[_id]; }
    get from() { return this[_from]; }
    get to() { return this[_to]; }
    get message() { return this[_message]; }
    get timestamp() { return this[_timestamp]; }
    set message(newMessage) { this[_message] = newMessage; }


    get JSON() {
        return JSON.stringify({
            id: this.id, from: this.from, to: this.to, message: this.message, timestamp: this.timestamp
        });
    }

    static fromJSON(json) {
        var data = JSON.parse(json);
        var message = new Message(data.id,data.from, data.to,data.message,data.timestamp);
        return message;
    }
}