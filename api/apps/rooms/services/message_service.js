const Message = require('../models/message')
const Room = require('../models/room')

/**
 * Service for CRUD an message
 */
class MessageService {

    /**
     * 
     * @param {Object} config 
     */
    constructor(config, socket){
        this.config = config
        this.socket = socket
    }

    /**
     * List and filter users
     * @param {Object} query 
     */
    list(query) {
        if ('search' in query){
            query.message = { $regex: query.search, $options: 'i' }
            delete query.search
        }
        if (query.member){
            return Room.find({ members: query.member })
            .then(rooms => rooms.map(room => room._id))
            .then(rooms => {
                delete query.member
                return Message.find({ ...query, room: { $in: rooms }})
                .then(objs => 
                    objs.map(obj => obj.view())
                )
            })
        }
        return Message.find(query)
        .then(objs => 
            objs.map(obj => obj.view())
        )
    }

    /**
     * Details of an user
     * @param {String} uuid 
     */
    details(uuid) {
        return Message.findOne({_id: uuid})
    }

    /**
     * Create new user
     * @param {Object} body 
     */
    create(body, user) {
        return Message.create({ ...body, alias: user.alias })
        .then(obj => obj.view()) 
        .then(obj => {
            if (this.socket){
                this.socket.sendMessage(obj)
            }
            return obj
        })
    }

    /**
     * Replace all fields of an user
     * @param {String} uuid 
     * @param {Object} body 
     */
    replace(uuid, body) {
        return Message.replaceOne({ _id: uuid}, body)
        .then(() => Message.findOne({ _id: uuid }))
        .then(obj => obj.view())
    }

    /**
     * Replace some fields of an user
     * @param {String} uuid 
     * @param {Object} body 
     */
    update(uuid, body) {
        return Message.updateOne({ _id: uuid}, { $set: body })
        .then(() => Message.findOne({ _id: uuid }))
        .then(obj => obj.view())
    }

    /**
     * Delete an user
     * @param {String} uuid 
     */
    delete(uuid) {
        return Message.deleteOne({ _id: uuid })
    }
}

module.exports = MessageService