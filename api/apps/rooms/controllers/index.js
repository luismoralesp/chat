const CrudController = require('./crud_controller')
const services = require('../services')

//inject services to controllers
module.exports = function (config, socket) {
    const { rooms, messages } = services(config, socket)

    return {
        room: new CrudController(config, rooms),
        messages: new CrudController(config, messages),
    }
}