import io from 'socket.io-client'
import config from '../config'

class SocketService{

    constructor(base_url = config.SOCKET_URL){
        this.base_url = base_url
    }

    static getInstance(){
        if (!SocketService.instance){
            SocketService.instance = new SocketService()
        }
        return SocketService.instance
    }

    connect(uuid){
        this.io = io(`${this.base_url}?uuid=${uuid}`)
    }

    subscribe(rooms){
        this.io.emit('subscribe', {rooms})
    }

    onMessage(room, callback){
        localStorage.room = room
        this.io.on('message', ({message}) => {
            console.log(message.room, localStorage.room)
            if (message.room === localStorage.room) {
                callback({message})   
            }
        })
    }
    
    onNewUser(callback){
        this.io.on('new-user', callback)
    }

    onNewRoom(callback){
        this.io.on('new-room', callback)
    }
}

export default SocketService