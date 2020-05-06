const Express = require('./express')

module.exports = function(config){
    //prepare express app
    const express = new Express(config)

    express.setup()

    return express
}