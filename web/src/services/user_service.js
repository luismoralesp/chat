import HttpService from './http_service';

class UserService{
    constructor(is_authenticated=true){
        this.http = new HttpService()
        this.http.is_authenticated = is_authenticated
    }

    list(query){
        return this.http.get('users', query)
    }

    details(uuid){
        return this.http.get(`users/${uuid}`)
    }

    patch(uuid, data){
        return this.http.patch(`users/${uuid}`, data)
    }

    create(data){
        return this.http.post(`users/`, data)
    }

    update(obj){
        return obj
    }

    replace(obj){
        return obj
    }

    delete(uuid) {

    }

}

export default UserService