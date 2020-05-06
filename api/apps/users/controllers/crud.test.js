const assert = require('assert')
const config = require('../../../config')()
const database = require('../../../database')
const Services = require('../services')
const CrudController = require('./crud_controller')

const conn = database(config)
const crud = new CrudController(config, Services(config))

const value = {
    alias: 'meow',
    email: 'usefffr@mail.co',
    password: '<mysecurepassword-123>'
}

const new_value = { 
    alias: 'meow',
    email: 'x@mail.co',
    password: '<tinypass>'
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

describe('CrudController', function() {
    let uuid;

    describe('', function() {
        it('start database connection', function() {
            return conn.start()
        })
    })

    describe('#create()', function() {
        it('check user creation', function() {
            return crud.create(
                { body: value },
                new Response(json => {
                    uuid = json.uuid
                    assert.equal(value.email, json.email)
                })
            )
        })
    })

    describe('#list()', function() {
        it('check user list', function() {
            return crud.list(
                { query: { email: value.email } },
                new Response(json => {
                    const emails = json.map(o => o.email)
                    uuid = json[0].uuid
                    return assert.equal(emails.includes(value.email), true)
                })
            )
        })
    })

    describe('#details()', function() {
        it('check user details', function() {
            return crud.details(
                { params: { uuid } },
                new Response(json => {
                    return assert.equal(json.email, value.email)
                })
            )
        })
    })

    describe('#update()', function() {
        it('check user update', function() {
            const new_email = 'u@mail.co'
            return crud.update(
                { params: { uuid }, body: { email: new_email } },
                new Response(json => {
                    return assert.equal(json.email, new_email)
                })
            )
        })
    })

    describe('#replace()', function() {
        it('check user replace', function() {
            return crud.replace(
                { params: { uuid }, body: new_value },
                new Response(json => {
                    return assert.equal(json.email, new_value.email)
                })
            )
        })
    })
    
    describe('#delete()', function() {
        it('check user delete', function() {
            return crud.delete(
                { params: { uuid } },
                new Response(json => {
                    return crud.details(
                        { params: { uuid } },
                        new Response(json => {
                            return assert.equal(json, null)
                        })
                    )
                })
            )                
        })
    })

    describe('', function() {
        it('end database connection', function() {
            return conn.end()
        })
    })
})