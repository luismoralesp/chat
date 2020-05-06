const assert = require('assert')
const config = require('../../../config')()
const CryptService = require('./crypt_service')

const crypt = new CryptService(config)

describe('CryptService', function() {
    const value = 'simple-value-123'
    let token
    let password

    describe('#create_token()', function() {
        it('check token generation', function() {
            token = crypt.create_token({ value })
        })
    })

    describe('#verify()', function() {
        it('check token verification', function() {
            return crypt.verify(token)
            .then(payload => assert.equal(payload.value, value) )
        })
    })
    
    describe('#encrypt()', function() {
        it('check password encryptation', function() {
            return crypt.encrypt(value)
            .then(encryted_value => {
                password = encryted_value
                return assert.notEqual(encryted_value, value)
            })
        })
    })
    
    describe('#compare()', function() {
        it('check password compare', function() {
            return crypt.compare(value, password)
            .then(result => assert.equal(result, true) )
        })
    })
})

