const assert = require('assert')
const chai = require('chai')
const chaiHttp = require('chai-http')
const config = require('../config')()
const Express = require('./express')

chai.should()
chai.use(chaiHttp)

describe('Express', function(){
    let app

    it('route: GET /test', function (){
        const express = new Express(config)

        app = express.setup()

        express.route({
            route: function (app, _){
                app.route("/test").get((_, res) => {
                    res.status(202).json({ message: 'ok'})
                })
            }
        })

        return assert.notEqual(app, null)
    })

    it('/GET test', function(){
        chai.request(app)
        .get('/test')
        .end((err, res) => {
            res.should.have.status(202)
            res.body.should.be.a('object')
            res.body.should.have.property('message').eql('ok')
        })
    })
    
})