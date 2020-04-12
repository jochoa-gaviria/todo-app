import axios from 'axios'
import {API_URL} from '../../Constans.js'

class AuthenticationService {

    executeBasicAuthenticationService(username,password){
        return axios.get(`${API_URL}/basicauth`, 
        { headers: { authorization: this.createBasicAuthToken(username, password) } })
    }

    executeJwtAuthenticationService(username,password){
        return axios.post(`${API_URL}/authenticate`, 
        { username,password })
    }

    // createBasicAuthToken(username,password){
    //     return 'Basic ' + window.btoa(username + ":" + password)
    // }

    // registerSucessfulLogin(username,password){
    //     sessionStorage.setItem('authenticatedUser',username)
    //     sessionStorage.setItem('key', this.createBasicAuthToken(username,password))
    //     this.setupAxiosInterceptor();
    // }

    registerSucessfulLoginJwt(username,token){
        sessionStorage.setItem('authenticatedUser',username)
        sessionStorage.setItem('key', token)
        this.setupAxiosInterceptor();
    }

    createJwtAuthToken(){
        return 'Bearer ' + sessionStorage.getItem('key')
    }

    logout(){
        sessionStorage.removeItem('authenticatedUser')
        sessionStorage.removeItem('key')
    }

    isUserLoggedIn(){
        let user = sessionStorage.getItem('authenticatedUser')
        if(user===null) return false
        return true
    }

    getLoggedInUserName(){
        let user = sessionStorage.getItem('authenticatedUser')
        if(user===null) return false
        return user
    }

    setupAxiosInterceptor(){
        //console.log("Calling axion interceptor")
        axios.interceptors.request.use(
            (config) =>  {
                if(this.isUserLoggedIn())
                    config.headers.authorization = this.createJwtAuthToken()
                    return config
            }
        )
    }
}

export default new AuthenticationService();