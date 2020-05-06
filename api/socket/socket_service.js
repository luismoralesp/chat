const io = require('socket.io-client')

class SocketService {

    constructor(config){
        this.config = config
    }

    connect(){
        this.io = io(`${this.config.SOCKET_URL}?uuid=${this.config.BACKEN_UUID}`)
    }

    sendMessage(message){
        this.io.emit('message', { message })
    }
    
    sendNewUser(user){
        this.io.emit('new-user', { user })
    }

    sendNewRoom(room){
        this.io.emit('new-room', { room })
    }
}

module.exports = SocketService