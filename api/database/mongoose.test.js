const config = require('../config')()
const MongooseDatabase = require('./mongoose')

const mongoose = new MongooseDatabase(config)

describe('MongooseDatabase', function() {

    describe('#start()', function() {
        it('check mongoose connection', function() {
            return mongoose.start()
        })
    })

    describe('#end()', function() {
        it('check mongoose close connection', function() {
            return mongoose.end()
        })
    })
})