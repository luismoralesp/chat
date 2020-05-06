const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

class Express {
    constructor(config){
        this.config = config
    }

    setup(){
        
        //start express app
        this.app = express()

        // parse application/x-www-form-urlencoded
        this.app.use(bodyParser.urlencoded({ extended: false }))
        
        // parse application/json
        this.app.use(bodyParser.json())
        
        // able server for all origins
        this.app.use(cors())

        return this.app
    }

    /**
     * Prepare a route
     * @param {Route} route 
     * @param {Array<Function>} route 
     */
    route(route, middlewares, socket){
        route.route(this.app, express.Router(), middlewares, socket)
    }

    start(){
        
        //start service
        return this.app.listen(this.config.EXPRESS_PORT, () => {
            console.log('App listening on port', this.config.EXPRESS_PORT)
        })
    }
}

module.exports = Express