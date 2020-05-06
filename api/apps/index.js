

module.exports = function (config, socket) {
    return {
        users: require('./users')(config, socket),
        rooms: require('./rooms')(config, socket),
    }
}