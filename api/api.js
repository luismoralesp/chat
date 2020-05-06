
/**
 *  @class Api
 *  class root of api and service
 */

class Api {

    /**
     * 
     * @param {Object} config 
     * @param {Express} express
     */
    constructor(config, express, database, middlewares, socket){
        this.config = config
        this.express = express
        this.database = database
        this.middlewares = middlewares
        this.socket = socket
    }

    install(apps){
        const socket = this.socket(this.config())
        this.installed_aps = apps(this.config(), socket)
    }

    start(){
        //prepare espress app
        const config = this.config()
        const express = this.express(config)
        const conn = this.database(config)
        const middlewares = this.middlewares(this.installed_aps)

        //prepare routes
        for (let app of Object.values(this.installed_aps)){
            express.route(app, middlewares)
        }

        conn.start()
        //start service
        express.start()
    }

}

module.exports = Api