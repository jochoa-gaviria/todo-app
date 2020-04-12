import axios from 'axios'
import {API_URL} from '../../Constans.js'


class TodoDataService {
    retrieveAllTodos(username){
        return axios.get(`${API_URL}/users/${username}/todos`)
    }

    deleteTodo(username,id){
        return axios.delete(`${API_URL}/users/${username}/todos/${id}`)
    }

    retrieveTodo(username,id){
        return axios.get(`${API_URL}/users/${username}/todos/${id}`)
    }

    updateTodo(username, id, todo){
        return axios.put(`${API_URL}/users/${username}/todos/${id}`, todo)
    }

    addTodo(username, todo){
        return axios.post(`${API_URL}/users/${username}/todos`, todo)
    }
}

export default new TodoDataService()