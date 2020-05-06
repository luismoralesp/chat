const chai = require('chai')
const chaiHttp = require('chai-http')
const database = require('../../database')
const config = require('../../config')()
const controllers = require('./controllers')
const express = require('../../express')
const RoomRoute = require('./route')

chai.should()
chai.use(chaiHttp)

const conn = database(config)
const user = new RoomRoute(config, controllers(config))
const express_app = express(config)
const value = {
    alias: 'room1',
    members: [
        'member1',
        'member2',
        'member3',
    ]
}

const new_value = { 
    alias: 'romm_alias', 
    members: [ 'member4' ]
}


express_app.route(user, {
    verify_token: (_,__, next) => next()
})

describe('RoomRoute', function(){
    let uuid

    beforeEach(function() {
        return conn.start()
    })

    describe('check create', function() {
        it('/POST rooms', function(){
            return chai.request(express_app.app)
            .post('/rooms')
            .send(value)
            .then((res) => {
                res.should.have.status(200, res)
                res.body.should.be.a('object')
                res.body.should.have.property('alias').eql(value.alias)
                uuid = res.body.uuid
            })
        })
    })

    describe('check details', function() {
        it('/GET rooms/:uuid', function(){
            return chai.request(express_app.app)
            .get(`/rooms/${uuid}`)
            .then((res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('alias').eql(value.alias)
            })
        })
    })

    describe('check list', function() {
        it('/GET rooms', function(){
            return chai.request(express_app.app)
            .get(`/rooms?alias=${value.alias}`)
            .then((res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                res.body.length.should.eq(1)
            })
        })
    })

    describe('check replace', function() {
        it('/PUT rooms/:uuid', function(){
            return chai.request(express_app.app)
            .put(`/rooms/${uuid}`)
            .send(new_value)
            .then((res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('alias').eql(new_value.alias)
                uuid = res.body.uuid
            })
        })
    })

    describe('check update', function() {
        it('/PUT rooms/:uuid', function(){
            return chai.request(express_app.app)
            .patch(`/rooms/${uuid}`)
            .send(new_value)
            .then((res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('alias').eql(new_value.alias)
            })
        })
    })

    describe('check delete', function() {
        it('/DELETE rooms/:uuid', function(){
            return chai.request(express_app.app)
            .delete(`/rooms/${uuid}`)
            .then(() => {
                return chai.request(express_app.app)
                .get(`/rooms?alias=${value.alias}`)
                .then((res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    res.body.length.should.eq(0)
                })
            })
        })
    })

    afterEach(function(){
        return conn.end()
    })

})