import EventEmitter from 'events';

class ChatEmitter extends EventEmitter {
    chatCreated(chat) { this.emit('chatcreated', chat);}
    chatUpdate(chat) { this.emit('chatupdate', chat); }
    chatDestroy(data) { this.emit('chatdestroy', data);}
}

export default new ChatEmitter();