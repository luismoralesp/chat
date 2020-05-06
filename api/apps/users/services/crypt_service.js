const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')

class CryptService {
    /**
     * 
     * @param {Object} config 
     */
    constructor(config){
        this.config = config
        this.secret = fs.readFileSync(this.config.JWT_SECRET)
    }

    /**
     * Create new token 
     * @param {String} payload 
     */
    create_token(payload){
        const options = { expiresIn: this.config.JWT_LIVE, algorithm: this.config.JWT_ALGORITHM }
        return jwt.sign({ ...payload, milliseconds: new Date().getMilliseconds()}, this.secret, options)
    }

    /**
     * Verify if token is valid
     * @param {String} token 
     */
    async verify(token){
        const options = { algorithms: this.config.JWT_ALGORITHM }
        return jwt.verify(token, this.secret, options)
    }

    /**
     * Encrypt a password
     * @param {String} password 
     */
    encrypt(password){
        const salt = parseInt(this.config.SALT_WORK_FACTOR)
        return bcrypt.genSalt(salt)
        .then(salt =>
            password? bcrypt.hash(password, salt): password
        )
    }

    /**
     * Compare a password
     * @param {String} plain_password 
     * @param {String} encrypted_password 
     */
    compare(plain_password, encrypted_password) {
        return bcrypt.compare(plain_password, encrypted_password)
    }
}

module.exports = CryptService