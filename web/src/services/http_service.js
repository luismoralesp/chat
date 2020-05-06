import axios from 'axios';
import config from '../config'

class HttpService{
    headers = {
        'Content-Type': 'application/json'
    }

    constructor(base_url=config.BACKEN_URL, is_authenticated=true){
        this.base_url = base_url
        this.is_authenticated = is_authenticated
    }

    _refresh_token(){
        if (this.is_authenticated){
            this.headers['Authorization'] = localStorage.token
        }
    }

    get(endpoint, params){
        this._refresh_token()
        return axios.get(`${this.base_url}/${endpoint}`, 
            { 
                headers: this.headers,
                params
            })
            .catch(err => {
                if(err.response.status == 401){
                    window.location.replace("/login")   
                }
                console.log(err.response)
            } )
    }

    post(endpoint, data){
        this._refresh_token()
        return axios.post(`${this.base_url}/${endpoint}`, data,
            { 
                headers: this.headers,
            })
    }

    patch(endpoint, data){
        this._refresh_token()
        return axios.patch(`${this.base_url}/${endpoint}`, data,
            { 
                headers: this.headers,
            })
    }
}

export default HttpService