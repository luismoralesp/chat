const chai = require('chai')
const chaiHttp = require('chai-http')
const database = require('../../database')
const config = require('../../config')()
const controllers = require('./controllers')
const express = require('../../express')
const UserRoute = require('./route')

chai.should()
chai.use(chaiHttp)

const conn = database(config)
const user = new UserRoute(config, controllers(config))
const express_app = express(config)
const value = {
    alias: 'meow',
    email: 'user@mail.co',
    password: '<mysecurepassword-123>'
}

const new_value = { 
    alias: 'meow',
    email: 'user2@mail.com',
    password: '<mytinypass>'
}


express_app.route(user, {
    verify_token: (_,__, next) => next()
})

describe('UserRoute', function(){
    let uuid

    beforeEach(function() {
        return conn.start()
    })

    describe('check create', function() {
        it('/POST users', function(){
            return chai.request(express_app.app)
            .post('/users')
            .send(value)
            .then((res) => {
                res.should.have.status(200, res)
                res.body.should.be.a('object')
                res.body.should.have.property('email').eql(value.email)
                uuid = res.body.uuid
            })
        })
    })

    describe('check details', function() {
        it('/GET users/:uuid', function(){
            return chai.request(express_app.app)
            .get(`/users/${uuid}`)
            .then((res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('email').eql(value.email)
            })
        })
    })

    describe('check list', function() {
        it('/GET users', function(){
            return chai.request(express_app.app)
            .get(`/users?email=${value.email}`)
            .then((res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                res.body.length.should.eq(1)
            })
        })
    })

    describe('check replace', function() {
        it('/PUT users/:uuid', function(){
            return chai.request(express_app.app)
            .put(`/users/${uuid}`)
            .send(new_value)
            .then((res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('email').eql(new_value.email)
                uuid = res.body.uuid
            })
        })
    })

    describe('check update', function() {
        it('/PUT users/:uuid', function(){
            return chai.request(express_app.app)
            .patch(`/users/${uuid}`)
            .send(new_value)
            .then((res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('email').eql(new_value.email)
            })
        })
    })

    describe('check delete', function() {
        it('/DELETE users/:uuid', function(){
            return chai.request(express_app.app)
            .delete(`/users/${uuid}`)
            .then(() => {
                return chai.request(express_app.app)
                .get(`/users?email=${value.email}`)
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