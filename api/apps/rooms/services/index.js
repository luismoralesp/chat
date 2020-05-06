const RoomSerivce = require('./room_service')
const MessageSerivce = require('./message_service')

//inject services to controller
module.exports = function (config, socket) {
    return {
        rooms: new RoomSerivce(config, socket),
        messages: new MessageSerivce(config, socket),
    }
}