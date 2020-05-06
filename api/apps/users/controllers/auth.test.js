const assert = require('assert')
const config = require('../../../config')()
const database = require('../../../database')
const Services = require('../services')
const CrudController = require('./crud_controller')
const AuthController = require('./auth_controller')

const conn = database(config)
const crud = new CrudController(config, Services(config))
const auth = new AuthController(config, Services(config))

const value = {
    alias: 'meow',
    email: 'user@mail.co',
    password: '<mysecurepassword-123>'
}

/**
 * Emulate Response object
 */
class Response {
    code = 200

    constructor(json){
        this.json = json
    }

    status(code){
        this.code = code
        return this
    }

}

describe('UserService', function() {
    let uuid;
    let token;
    let user;

    describe('', function() {
        it('start database connection', function() {
            return conn.start()
        })
    })


    describe('', function() {
        it('create default user', function() {
            return crud.create(
                { body: value },
                new Response(json => {
                    uuid = json.uuid
                })
            )
        })
    })
    describe('#login()', function() {
        it('check login', function() {
            return auth.login(
                { body: value },
                new Response(json => {
                    token = json.token
                    return assert.notEqual(json.token, undefined)
                })
            )
        })
    })

    describe('#refresh()', function() {
        it('check refresh', function() {
            return auth.refresh(
                { header: () => token },
                new Response(json => {
                    token = json.token
                    return assert.notEqual(json.token, undefined)
                })
            )
        })
    })
    
    describe('#verify()', function() {
        it('check verify', function() {
            return auth.verify(
                { header: () => token },
                new Response((err) => {
                    assert.equal(false, true)
                }),
                (json => {
                    return assert.notEqual(json, null)
                })
            )
        })
    })

    describe('#logout()', function() {
        it('check logout', function() {
            return auth.logout(
                { header: () => token },
                new Response(() => {
                    return auth.refresh(
                        { header: () => token },
                        new Response(json => {
                            return assert.equal(json.token, undefined)
                        })
                    )
                })
            )
        })
    })
    
    describe('', function() {
        it('delete default user', function() {
            return crud.delete(
                { params: { uuid } },
                new Response(() => {})
            )                
        })
    })

    describe('', function() {
        it('end database connection', function() {
            return conn.end()
        })
    })
})