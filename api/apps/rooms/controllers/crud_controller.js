
/**
 * Controller for CRUD
 */
class CrudController {

    /**
     * 
     * @param {Object} config 
     * @param {UserService} services 
     */
    constructor(config, services) {
        this.config = config
        this.services = services
    }

    /**
     * Show a list
     * @param {Request} req 
     * @param {Response} res 
     */
    list(req, res) {
        const query = req.query
        return this.services.list(query)
            .then(objs => res.json(objs))
            .catch(err => res.status(400).json(err))
    }


    /**
     * Show details 
     * @param {Request} req 
     * @param {Response} res 
     */
    details(req, res) {
        const uuid = req.params.uuid
        return this.services.details(uuid)
            .then(objs => res.json(objs))
            .catch(err => res.status(400).json(err))
    }

    
    /**
     * Create 
     * @param {Request} req 
     * @param {Response} res 
     */
    create(req, res) {
        const body = req.body
        return this.services.create(body, req.user)
            .then(objs => res.json(objs))
            .catch(err => res.status(400).json(err))
    }

    
    /**
     * Replace all fields
     * @param {Request} req 
     * @param {Response} res 
     */
    replace(req, res){
        const uuid = req.params.uuid
        const body = req.body
        return this.services.replace(uuid, body)
            .then(objs => res.json(objs))
            .catch(err => res.status(400).json(err))
    }

    
    /**
     * Replace some fields 
     * @param {Request} req 
     * @param {Response} res 
     */
    update(req, res){
        const uuid = req.params.uuid
        const body = req.body
        return this.services.update(uuid, body)
            .then(objs => res.json(objs))
            .catch(err => res.status(400).json(err))
    }

    /**
     * Delete
     * @param {Request} req 
     * @param {Response} res 
     */
    delete(req, res){
        const uuid = req.params.uuid
        return this.services.delete(uuid)
            .then(objs => res.json(objs))
            .catch(err => res.status(400).json(err))
    }
}

module.exports = CrudController