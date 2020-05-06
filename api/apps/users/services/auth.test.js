const assert = require('assert')
const config = require('../../../config')()
const database = require('../../../database')
const CryptService = require('./crypt_service')
const UserService = require('./user_service')
const AuthService = require('./auth_service')

const conn = database(config)
const cryp = new CryptService(config)
const user = new UserService(config, cryp)
const serv = new AuthService(config, cryp)
const value = {
    alias: 'meow',
    email: 'user@mail.co',
    password: '<mysecurepassword-123>'
}

describe('AuthService', function(){
    let uuid;
    let _token;

    describe('', function() {
        it('start database connection', function() {
            return conn.start()
        })
    })
    
    describe('', function() {
        it('create default user', function() {
            return user.create(value)
            .then(user => { uuid = user.uuid })
        })
    })

    describe('#login()', function(){
        it('check login', function(){
            return serv.login(value.email, value.password)
            .then( ({user, token}) => {
                _token = token
                return assert.equal(user.email, value.email)
            })
        })
    })

    describe('#refresh()', function(){
        it('check refresh', function(){
            return serv.refresh(_token)
            .then( ({user, token}) => {
                _token = token
                return assert.equal(user.email, value.email)
            })
        })
    })

    describe('#verify()', function(){
        it('check verify', function(){
            return serv.verify(_token)
            .then(result => {
                return assert.notEqual(result, null)
            })
        })
    })

    describe('#logout()', function(){
        it('check logout', function(){
            return serv.logout(_token)
            .then( () => 
                serv.verify(_token)
                .then(result => {
                    return assert.notEqual(result, true)
                })
            )
        })
    })

    describe('#delete()', function() {
        it('check user delete', function() {
            return user.delete(uuid)
        })
    })

    describe('', function() {
        it('end database connection', function() {
            return conn.end()
        })
    })
})