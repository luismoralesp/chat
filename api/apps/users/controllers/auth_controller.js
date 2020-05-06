
/**
 * Controller for authentication
 */
class AuthController {
    /**
     * 
     * @param {Object} config 
     * @param {AuthService} service 
     */
    constructor(config, services){
        this.config = config
        this.services = services
    }

    /**
     * Login
     * @param {Request} req 
     * @param {Response} res 
     */
    login(req, res){
        const email = req.body.email
        const password = req.body.password
        return this.services.auth.login(email, password)
            .then(objs => res.json(objs))
            .catch(err => res.status(400).json(err))
    }

    /**
     * Logout
     * @param {Request} req 
     * @param {Response} res 
     */
    logout(req, res){
        const token = req.header('Authorization')
        return this.services.auth.logout(token)
            .then(objs => res.json(objs))
            .catch(err => res.status(400).json(err))
    }

    /**
     * Refresh token
     * @param {Request} req 
     * @param {Response} res 
     */
    refresh(req, res){
        const token = req.header('Authorization')
        return this.services.auth.refresh(token)
            .then(objs => res.json(objs))
            .catch(err => res.status(400).json(err))
    }

    /**
     * Verify token
     * @param {Request} req 
     * @param {Response} res 
     */
    verify(req, res, next){
        const token = req.header('Authorization')
        return this.services.auth.verify(token)
            .then(objs => next(objs))
            .catch(err => res.status(401).json({ message: 'Invalid token!', ...err}))
    }
}

module.exports = AuthController