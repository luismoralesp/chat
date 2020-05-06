import HttpService from './http_service'
import config from '../config'

class AuthService{
    constructor(){
        this.http = new HttpService()
    }

    login(email, password){
        return this.http.post('login/', { email, password })
    }

    logout(){
        return this.http.post('logout/')
    }

    refresh(){
        return this.http.post('refresh/')
    }

    updateNextTime(){
        localStorage.nextTime = (new Date().getTime() + config.REFRESH_INTERVAL)
    }

    getNextMillis(){
        const nextTime = parseInt(localStorage.nextTime)
        return nextTime - new Date().getTime()
    }
}

export default AuthService