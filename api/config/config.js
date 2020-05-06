require('dotenv').config()

/**
 *  Configuration class
 */
class Config {
    /**
     * 
     * @param {Object} env 
     */
    constructor(env){
        this.env = env
    }

    /**
     * Get configuration object based on NODE_ENV
     */
    getConfig(){
        const NODE_ENV = this.env.NODE_ENV
        return {
            ...this.env, ...this.environs[NODE_ENV]
        }
    }

    environs = {
        test: {},

        development: {},
    
        production: {},
    
    }
}

module.exports = Config