const SocketService = require('./socket_service')

module.exports = function(config){
    const socket = new SocketService(config)
    socket.connect()
    return socket 
}