const Config = require('./config')

module.exports = function(){
    return new Config(process.env).getConfig()
}