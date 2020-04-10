import React, {Component} from 'react'
import todoDataService from '../../api/todo/todoDataService.js'
import AuthenticationService from './AuthenticationService.js'
import './TodoListComponent.css'
import moment from 'moment'

class ListTodosComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            todos : [],
            message : null
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
        this.updateTodoClicked=this.updateTodoClicked.bind(this)
        this.addTodoClicked=this.addTodoClicked.bind(this)
    }

    componentDidMount(){
        this.refreshTodos()
    }

    refreshTodos(){
        let username = AuthenticationService.getLoggedInUserName()
        todoDataService.retrieveAllTodos(username)
        .then(response => this.handleSuccesfulResponse(response))
        .catch(error => this.handleError(error))
    }

    render(){
    return (
        <div>
            <h1>List Todos</h1>
            {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
            <div className="table-wrapper-scroll-y my-custom-scrollbar">
                <table className="table table-striped mb-0">
                    <thead>
                        <tr>
                            <th scope="col">Description</th>
                            <th scope="col">Is Completed?</th>
                            <th scope="col">Target date</th>
                            <th scope="col">Update</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        this.state.todos.map (
                            todo => 
                            <tr key={todo.id}>
                                <td>{todo.description}</td>
                                <td>{todo.done.toString()}</td>
                                <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                <td><button className="btn btn-success" onClick={()=>this.updateTodoClicked(todo.id)}>Update</button></td>
                                <td><button className="btn btn-warning" onClick={()=>this.deleteTodoClicked(todo.id)}>Delete</button></td>
                            </tr>
                        )
                        }
                    </tbody>
                </table>
               <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="row col-lg-3">
                            <button className="btn btn-outline-success col-md-3" onClick={this.addTodoClicked}>Add new todo</button>
                        </div>
                    </div>
               </div>
            </div>
        </div>
        )
    }


    handleSuccesfulResponse(response){
        console.log(response)
        this.setState({todos:response.data})   
    }
    handleError(error){
        console.log(error.response)
        //TODO show a Modal with Error
    }

    deleteTodoClicked(id){
        let username = AuthenticationService.getLoggedInUserName()
        todoDataService.deleteTodo(username,id)
        .then(response => {
            this.setState({message : `Delete of todo ${id} Successful`})
            this.refreshTodos()
        })
        .catch(error => this.handleError(error))
    }

    updateTodoClicked(id){

        this.props.history.push(`/todos/${id}`)
        // let username = AuthenticationService.getLoggedInUserName()
        // todoDataService.deleteTodo(username,id)
        // .then(response => {
        //     this.setState({message : `Delete of todo ${id} Successful`})
        //     this.refreshTodos()
        // })
        // .catch(error => this.handleError(error))
    }

    addTodoClicked(){
        this.props.history.push(`/todos/-1`)
    }
}

export default ListTodosComponent