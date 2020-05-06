import HttpService from './http_service'
import config from '../config'

class ImageService{
    constructor(){
        this.base_url = config.MEDIA_URL
        this.http = new HttpService(this.base_url)
    }

    parse(name){
        return `${this.base_url}/${name}`
    }

    upload(file) {
        const data = new FormData() 
        data.append('photo', file)
        return this.http.post('upload', data)
    }

}

export default ImageService