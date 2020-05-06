
/**
 * Verify if user is authenticated
 * @param {APPS} apps 
 */
function verify_token(apps){
    return function (req, res, next){

        apps.users.controllers.auth.verify(req, res, token => {
            return apps.users.controllers.crud.services.crud.details(token.user_uuid)
            .then(user => {
                req.user = user
                return token? next(): res.status(401).json({ message:'Authentication required!' })    
            })
        })
    }    
}


module.exports = verify_token