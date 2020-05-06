const assert = require('assert')
const config = require('../../../config')()
const database = require('../../../database')
const Services = require('../services')
const CrudController = require('./crud_controller')

const conn = database(config)
const crud = new CrudController(config, Services(config).messages)

const value = {
    date: new Date(),
    emitter: 'me',
    room: 'my-room',
    message: 'hi!'
}

const new_value = { 
    date: new Date(), 
    emmiter: 'you', 
    room: 'your-room',
    message: 'hi!'
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
                { body: value, user: { alias: 'meow' } },
                new Response(json => {
                    uuid = json.uuid
                    assert.equal(value.emitter, json.emitter)
                })
            )
        })
    })

    describe('#list()', function() {
        it('check user list', function() {
            return crud.list(
                { query: { emitter: value.emitter } },
                new Response(json => {
                    const emitters = json.map(o => o.emitter)
                    uuid = json[0].uuid
                    return assert.equal(emitters.includes(value.emitter), true)
                })
            )
        })
    })

    describe('#details()', function() {
        it('check user details', function() {
            return crud.details(
                { params: { uuid } },
                new Response(json => {
                    return assert.equal(json.emitter, value.emitter)
                })
            )
        })
    })

    describe('#update()', function() {
        it('check user update', function() {
            const new_emitter = 'u@mail.co'
            return crud.update(
                { params: { uuid }, body: { emitter: new_emitter } },
                new Response(json => {
                    return assert.equal(json.emitter, new_emitter)
                })
            )
        })
    })

    describe('#replace()', function() {
        it('check user replace', function() {
            return crud.replace(
                { params: { uuid }, body: new_value },
                new Response(json => {
                    return assert.equal(json.emitter, new_value.emitter)
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