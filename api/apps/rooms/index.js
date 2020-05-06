const RoomRoute = require('./route')
const Controllers = require('./controllers')

//inject controller to api
module.exports = function (config, socket) {
    return new RoomRoute(config, Controllers(config, socket))
}