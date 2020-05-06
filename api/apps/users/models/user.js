const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    alias: {
        type: String,
        required: true,
        unique: true,
    },
    photo: {
        type: String
    },
    password: {
        type: String,
        required: true,
    },
});

UserSchema.methods = {
    view(){
        return {
            uuid: this._id,
            email: this.email,
            alias: this.alias,
            photo: this.photo,
        }
    }
}

const User = mongoose.model('User', UserSchema)

module.exports = User