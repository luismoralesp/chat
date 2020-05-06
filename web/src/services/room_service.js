import HttpService from './http_service';

class RoomService{
    constructor(){
        this.http = new HttpService()
    }

    list(query){
        return this.http.get('rooms', query)
    }

    create(obj){
        return this.http.post('rooms', obj)
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

export default RoomService