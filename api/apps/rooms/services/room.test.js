const assert = require('assert')
const config = require('../../../config')()
const database = require('../../../database')
const UserService = require('./room_service')

const conn = database(config)
const serv = new UserService(config)
const value = {
    alias: 'room1',
    members: [
        'member1',
        'member2',
        'member3',
    ]
}

describe('RoomService', function() {
    let uuid;

    describe('', function() {
        it('start database connection', function() {
            return conn.start()
        })
    })

    describe('#create()', function() {
        it('check room creation', function() {
            return serv.create(value)
        })
    })

    describe('#list()', function() {
        it('check room list: alias', function() {
            return serv.list({ alias: value.alias })
            .then(rooms => {
                const aliases = rooms.map(u => u.alias )
                uuid = rooms[0].uuid
                return assert.equal(aliases.includes(value.alias), true)
            })
        })

        it('check room list: members', function() {
            return serv.list({ members: 'member1' })
            .then(users => {
                const aliases = users.map(u => u.members )
                                .filter(u => u.includes('member1'))
                return assert.notEqual(aliases.length, 0)
            })
        })
    })

    describe('#details()', function() {
        it('check room details', function() {
            return serv.details(uuid)
            .then(room => {
                return assert.equal(room.alias, value.alias)
            })
        })
    })

    describe('#replace()', function() {
        it('check room replace', function() {
            const new_value = { alias: 'romm_alias', members: [ 'member4' ]}
            return serv.replace(uuid, new_value)
            .then(room => {
                return assert.equal(room.alias, new_value.alias)
            })
        })
    })

    describe('#update()', function() {
        it('check room update', function() {
            const new_value = { alias: 'romm_alias2', members: [ 'member5' ]}
            return serv.update(uuid, new_value)
            .then(room => {
                return assert.equal(room.alias, new_value.alias)
            })
        })
    })

    describe('#delete()', function() {
        it('check room delete', function() {
            return serv.delete(uuid)
            .then(() => {
                return serv.details(uuid)
                .then(room => {
                    return assert.equal(room, null)
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