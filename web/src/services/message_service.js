import HttpService from './http_service';

class MessageService{
    constructor(){
        this.http = new HttpService()
    }

    list(query){
        return this.http.get('rooms/@/messages', query)
    }

    create(obj){
        return this.http.post('rooms/@/messages', obj)
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

export default MessageService