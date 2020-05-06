const UserRoute = require('./route')
const Controllers = require('./controllers')

//inject controller to api
module.exports = function (config, socket) {
    return new UserRoute(config, Controllers(config, socket))
}