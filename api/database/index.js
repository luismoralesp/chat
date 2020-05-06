const MongooseDatabase = require('./mongoose')

module.exports = function (config) {
    return new MongooseDatabase(config)
}