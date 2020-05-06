const mongoose = require('mongoose')

const TokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    user_uuid: {
        type: String,
        required: true,
    }
});

TokenSchema.methods = {
    view(){
        return {
            uuid: this._id,
            token: this.token,
            expiration_time: this.expiration_time
        }
    }
}

const Token = mongoose.model('Token', TokenSchema)

module.exports = Token