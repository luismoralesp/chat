/**
 *  @class RoomRoute
 *  class for user routes
 */

class RoomRoute {
    /**
     * 
     * @param {Object} config 
     * @param {Controllers} controllers 
     * @param {Express} express 
     */
    constructor(config, controllers){
        this.config = config
        this.controllers = controllers
    }

    /**
     * 
     * @param {ExpressApp} app 
     */
    route(app, router, { verify_token }, socket) {
        // config rooms api
        router
            .use(verify_token)
            .get('/', (req, res) => this.controllers.room.list(req, res) )
            .post('/', (req, res) => this.controllers.room.create(req, res, socket))
            .get('/:uuid', (req, res) => this.controllers.room.details(req, res))
            .put('/:uuid', (req, res) => this.controllers.room.replace(req, res))
            .patch('/:uuid', (req, res) => this.controllers.room.update(req, res))
            .delete('/:uuid', (req, res) => this.controllers.room.delete(req, res))

            .get('/@/messages/', (req, res) => this.controllers.messages.list(req, res) )
            .post('/@/messages/', (req, res) => this.controllers.messages.create(req, res, socket))
            .get('/@/messages/:uuid', (req, res) => this.controllers.messages.details(req, res))
            .put('/@/messages/:uuid', (req, res) => this.controllers.messages.replace(req, res))
            .patch('/@/messages/:uuid', (req, res) => this.controllers.messages.update(req, res))
            .delete('/@/messages/:uuid', (req, res) => this.controllers.messages.delete(req, res))

            app.use('/rooms', router)
    }

}

module.exports = RoomRoute