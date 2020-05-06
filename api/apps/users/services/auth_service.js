const User = require('../models/user')
const Token = require('../models/token')

/**
 * Service for authentication
 */
class AuthService {
    /**
     * 
     * @param {Object} config 
     * @param {CryptService} crypt 
     */
    constructor(config, crypt){
        this.config = config
        this.crypt = crypt
    }

    /**
     * Create a new token using email and password
     * @param {String} email 
     * @param {String} password 
     */
    login(email, password){
        return User.findOne({ email })
        .then(async user => {
            //if email and password not match
            if (!user || !( await this.crypt.compare(password, user.password))){
                throw { "message": "Email/password not match!" }
            }
            return user.view()
        })
        .then( user => 
            //store a new token
            Token.create({
                token: this.crypt.create_token(user),
                user_uuid: user.uuid
            })
            .then(token => ({user, token: token.token}))
        )
        
    }

    /**
     * Delete a token
     * @param {String} token 
     */
    logout(token){
        return Token.deleteOne({ token })
    }
    
    /**
     * Refresh a token
     * It will delete old token and create new one
     * @param {String} token 
     */
    refresh(token){
        return Token.findOne({ token })
        .then(token => {
            //if token not found
            if (!token) {
                throw { "message": "Token not found!" }
            }
            
            return Token.deleteOne({ _id: token._id })
            .then( () => token )
        })
        .then(token => User.findOne({ _id: token.user_uuid }))
        .then(user => 
            // store a new token
            Token.create({
                token: this.crypt.create_token(user.view()),
                user_uuid: user._id
            }).then(token => ({ user: user.view(), token: token.token }))
        )
    }

    /**
     * Verify if a token is valid
     * @param {String} token 
     */
    verify(token) {
        return this.crypt.verify(token)
        .then( decoded => {
            return Token.findOne({ token })
            .then(token => {
                return (token && decoded && token.user_uuid == decoded.uuid)?token: false
            } )
        })
    }

}

module.exports = AuthService