import axios from 'axios'

class AuthenticationService {

    executeBasicAuthenticationService(username,password){
        return axios.get('http://localhost:8080/basicauth', 
        { headers: { authorization: this.createBasicAuthToken(username, password) } })
    }

    createBasicAuthToken(username,password){
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    registerSucessfulLogin(username,password){
        sessionStorage.setItem('authenticatedUser',username)
        sessionStorage.setItem('key', this.createBasicAuthToken(username,password))
        this.setupAxiosInterceptor();
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
        console.log("Calling axion interceptor")
        axios.interceptors.request.use(
            (config) =>  {
                if(this.isUserLoggedIn())
                    config.headers.authorization = sessionStorage.getItem('key')
                    return config
            }
        )
    }
}

export default new AuthenticationService();