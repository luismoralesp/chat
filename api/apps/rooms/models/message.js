const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        unique: true,
        default: Date.now
    },
    emitter: {
        type: String,
        required: true,
        unique: true,
    },
    alias: {
        type: String,
        required: true,
        unique: true,
    },
    room: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
});

MessageSchema.methods = {
    view(){
        return {
            uuid: this._id,
            date: this.date,
            emitter: this.emitter,
            alias: this.alias,
            room: this.room,
            message: this.message,
        }
    }
}

const Message = mongoose.model('Message', MessageSchema)

module.exports = Message