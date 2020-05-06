const assert = require('assert')
const config = require('../../../config')()
const database = require('../../../database')
const CryptService = require('./crypt_service')
const UserService = require('./user_service')

const conn = database(config)
const cryp = new CryptService(config)
const serv = new UserService(config, cryp)
const value = {
    alias: 'meow',
    email: 'user@mail.co',
    password: '<mysecurepassword-123>'
}

describe('UserService', function() {
    let uuid;

    describe('', function() {
        it('start database connection', function() {
            return conn.start()
        })
    })

    describe('#create()', function() {
        it('check user creation', function() {
            return serv.create(value)
        })
    })

    describe('#list()', function() {
        it('check user list', function() {
            return serv.list({ email: value.email })
            .then(users => {
                const emails = users.map(u => u.email )
                uuid = users[0].uuid
                return assert.equal(emails.includes(value.email), true)
            })
        })
    })

    describe('#details()', function() {
        it('check user details', function() {
            return serv.details(uuid)
            .then(user => {
                return assert.equal(user.email, value.email)
            })
        })
    })

    describe('#replace()', function() {
        it('check user replace', function() {
            const new_value = { email: 'user2@mail.com', password: '<mytinypass>'}
            return serv.replace(uuid, new_value)
            .then(user => {
                return assert.equal(user.email, new_value.email)
            })
        })
    })

    describe('#update()', function() {
        it('check user update', function() {
            const new_value = { email: 'user2@mail.com', password: '<mytinypass>'}
            return serv.update(uuid, new_value)
            .then(user => {
                return assert.equal(user.email, new_value.email)
            })
        })
    })

    describe('#delete()', function() {
        it('check user delete', function() {
            return serv.delete(uuid)
            .then(() => {
                return serv.details(uuid)
                .then(user => {
                    return assert.equal(user, null)
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