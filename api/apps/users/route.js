/**
 *  @class UserRoute
 *  class for user routes
 */

class UserRoute {
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
    route(app, router, { verify_token }) {
        // config users api
        router
            .post('/', (req, res) => this.controllers.crud.create(req, res))
            .use(verify_token)
            .get('/', (req, res) => this.controllers.crud.list(req, res) )
            .get('/:uuid', (req, res) => this.controllers.crud.details(req, res))
            .put('/:uuid', (req, res) => this.controllers.crud.replace(req, res))
            .patch('/:uuid', (req, res) => this.controllers.crud.update(req, res))
            .delete('/:uuid', (req, res) => this.controllers.crud.delete(req, res))

        app
            .use('/users', router)
            .post('/login', (req, res) => this.controllers.auth.login(req, res))
            .post('/logout', (req, res) => this.controllers.auth.logout(req, res))
            .post('/refresh', (req, res) => this.controllers.auth.refresh(req, res))
    }

}

module.exports = UserRoute