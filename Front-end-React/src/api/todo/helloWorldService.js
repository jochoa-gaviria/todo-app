import axios from 'axios'

class HelloWorldService {
    executedHelloWorldService(){
        return axios.get('http://localhost:8080/hello-world')
    }
    executedHelloBeanWorldService(){
        return axios.get('http://localhost:8080/hello-world-bean')
    }

    executedHelloWorldPathVariableService(name){
        return axios.get(`http://localhost:8080/hello/path-variable/${name}`)
    }
}


export default new HelloWorldService()