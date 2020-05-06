const assert = require('assert')
const config = require('../../../config')()
const database = require('../../../database')
const MessageService = require('./message_service')

const conn = database(config)
const serv = new MessageService(config)
const value = {
    alias: 'meow',
    date: new Date(),
    emitter: 'me',
    room: 'my-room',
    message: 'hi!'
}

describe('MessageService', function() {
    let uuid;

    describe('', function() {
        it('start database connection', function() {
            return conn.start()
        })
    })

    describe('#create()', function() {
        it('check message creation', function() {
            return serv.create(value, { alias: 'meow'})
        })
    })

    describe('#list()', function() {
        it('check message list', function() {
            return serv.list({ emitter: value.emitter })
            .then(messages => {
                const emitteres = messages.map(u => u.emitter )
                uuid = messages[0].uuid
                return assert.equal(emitteres.includes(value.emitter), true)
            })
        })

    })

    describe('#details()', function() {
        it('check message details', function() {
            return serv.details(uuid)
            .then(message => {
                return assert.equal(message.emitter, value.emitter)
            })
        })
    })

    describe('#replace()', function() {
        it('check message replace', function() {
            const new_value = { date: new Date(), emmiter: 'you', room: 'your-room'}
            return serv.replace(uuid, new_value)
            .then(message => {
                return assert.equal(message.emitter, new_value.emitter)
            })
        })
    })

    describe('#update()', function() {
        it('check message update', function() {
            const new_value = { date: new Date(), emmiter: 'you', room: 'your-room'}
            return serv.update(uuid, new_value)
            .then(message => {
                return assert.equal(message.emitter, new_value.emitter)
            })
        })
    })

    describe('#delete()', function() {
        it('check message delete', function() {
            return serv.delete(uuid)
            .then(() => {
                return serv.details(uuid)
                .then(message => {
                    return assert.equal(message, null)
                })
            })
        })
    })

    describe('', function() {
        it('end database connection', function() {
            return conn.end()
        })
    })
})