const User = require('../models/user')

/**
 * Service for CRUD an user
 */
class UserService {

    /**
     * 
     * @param {Object} config 
     */
    constructor(config, crypt, socket){
        this.config = config
        this.crypt = crypt
        this.socket = socket
    }

    /**
     * List and filter users
     * @param {Object} query 
     */
    list(query) {
        if ('search' in query){
            query.alias = { $regex: query.search, $options: 'i' }
            delete query.search
        }
        return User.find(query)
        .then(objs => 
            objs.map(obj => obj.view())
        )
    }

    /**
     * Details of an user
     * @param {String} uuid 
     */
    details(uuid) {
        return User.findOne({_id: uuid})
    }

    /**
     * Create new user
     * @param {Object} body 
     */
    create(body) {
        return this.crypt.encrypt(body.password)
        .then(password => 
            User.create(password?{ ...body, password}: body)
            .then(obj => obj.view())
            .then(obj => {
                if (this.socket){
                    this.socket.sendNewUser(obj)
                }
                return obj
            })
        )
         
    }

    /**
     * Replace all fields of an user
     * @param {String} uuid 
     * @param {Object} body 
     */
    replace(uuid, body) {
        return this.crypt.encrypt(body.password)
        .then(password => 
            User.replaceOne({ _id: uuid}, password?{ ...body, password}: body)
            .then(() => User.findOne({ _id: uuid }))
            .then(obj => obj.view())
        ).then(obj => {
            if (this.socket){
                this.socket.sendNewUser(obj)
            }
            return obj
        })
    }

    /**
     * Replace some fields of an user
     * @param {String} uuid 
     * @param {Object} body 
     */
    update(uuid, body) {
        return this.crypt.encrypt(body.password)
        .then(password => 
            User.updateOne({ _id: uuid}, { $set: password?{ ...body, password}: body })
            .then(() => User.findOne({ _id: uuid }))
            .then(obj => obj.view())
        ).then(obj => {
            if (this.socket){
                this.socket.sendNewUser(obj)
            }
            return obj
        })
    }

    /**
     * Delete an user
     * @param {String} uuid 
     */
    delete(uuid) {
        return User.deleteOne({ _id: uuid }).then(obj => {
            if (this.socket){
                this.socket.sendNewUser(obj)
            }
            return obj
        })
    }
}

module.exports = UserService