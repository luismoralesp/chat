const UserSerivce = require('./user_service')
const AuthSerivce = require('./auth_service')
const CryptSerivce = require('./crypt_service')

//inject services to controller
module.exports = function (config, socket) {
    const crypt = new CryptSerivce(config)
    return {
        crud: new UserSerivce(config, crypt, socket),
        auth: new AuthSerivce(config, crypt, socket),
    }
}