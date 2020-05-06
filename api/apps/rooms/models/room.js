const mongoose = require('mongoose')

const RoomSchema = new mongoose.Schema({
    alias: {
        type: String
    },
    personal: {
        type: Boolean,
        default: false
    },
    members: [{
        type: String,
        required: true
    }]
});

RoomSchema.methods = {
    view(){
        return {
            uuid: this._id,
            alias: this.alias,
            personal: this.personal,
            members: this.members,
        }
    }
}

const Room = mongoose.model('Room', RoomSchema)

module.exports = Room