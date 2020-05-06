const CrudController = require('./crud_controller')
const AuthController = require('./auth_controller')
const services = require('../services')

//inject services to controller
module.exports = function (config, socket) {
    return {
        crud: new CrudController(config, services(config, socket)),
        auth: new AuthController(config, services(config, socket)),
    }
}