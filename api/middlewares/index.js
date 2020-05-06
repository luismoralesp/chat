const verify_token = require('./verify_token')

/**
 * Inject apps
 */
module.exports = function (apps) {
    return {
        verify_token: verify_token(apps)
    }
}