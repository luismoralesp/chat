const Room = require('../models/room')

/**
 * Service for CRUD an room
 */
class RoomService {

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
        return Room.find(query)
        .then(objs => 
            objs.map(obj => obj.view())
        )
    }

    /**
     * Details of an user
     * @param {String} uuid 
     */
    details(uuid) {
        return Room.findOne({_id: uuid})
    }

    /**
     * Create new user
     * @param {Object} body 
     */
    create(body) {
        if (body.personal) {
            return Room.findOne({ members: { $all: body.members, $size: body.members.length }, personal: body.personal })
            .then(result => result? result:Room.create(body) )
            .then(obj => obj.view())
        } else {
            return Room.create(body)
            .then(obj => obj.view())
            .then(obj => {
                if (this.socket){
                    this.socket.sendNewRoom(obj)
                }
                return obj
            })     
        }
    }

    /**
     * Replace all fields of an user
     * @param {String} uuid 
     * @param {Object} body 
     */
    replace(uuid, body) {
        return Room.replaceOne({ _id: uuid}, body)
        .then(() => Room.findOne({ _id: uuid }))
        .then(obj => obj.view())
    }

    /**
     * Replace some fields of an user
     * @param {String} uuid 
     * @param {Object} body 
     */
    update(uuid, body) {
        return Room.updateOne({ _id: uuid}, { $set: body })
        .then(() => Room.findOne({ _id: uuid }))
        .then(obj => obj.view())
    }

    /**
     * Delete an user
     * @param {String} uuid 
     */
    delete(uuid) {
        return Room.deleteOne({ _id: uuid })
    }
}

module.exports = RoomService