const mongoose = require('mongoose');

/**
 * Mongoose database driver
 */
class MongooseDatabase{
    /**
     * 
     * @param {Object} config 
     */
    constructor(config){
        this.config = config
    }

    start(){
        const config_db = { 
            useNewUrlParser: !!this.config.MONGOOSE_NEW_URL_PARSER, 
            useUnifiedTopology: !!this.config.MONGOOSE_UNIFIED_TOPOLOGY,
            useCreateIndex: !!this.config.MONGOOSE_CREATE_INDEX,
        }
        return mongoose.connect(`mongodb://${this.config.MONGOOSE_USER}:${this.config.MONGOOSE_PASSWORD}@${this.config.MONGOOSE_HOST}:${this.config.MONGOOSE_PORT}/${this.config.MONGOOSE_DATABASE}`, config_db)
    }

    end(){
        return mongoose.connection.close()
    }
}

module.exports = MongooseDatabase