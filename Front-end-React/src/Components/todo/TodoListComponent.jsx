import React, {Component} from 'react'
import todoDataService from '../../api/todo/todoDataService.js'
import AuthenticationService from './AuthenticationService.js'

class ListTodosComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            todos : [],
            message : null
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
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
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Is Completed?</th>
                            <th>Target date</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        this.state.todos.map (
                            todo => 
                            <tr key={todo.id}>
                                <td>{todo.description}</td>
                                <td>{todo.done.toString()}</td>
                                <td>{todo.targetDate.toString()}</td>
                                <td><button className="btn btn-success" onClick={()=>this.updateTodoClicked(todo.id)}>Update</button></td>
                                <td><button className="btn btn-warning" onClick={()=>this.deleteTodoClicked(todo.id)}>Delete</button></td>
                            </tr>
                        )
                        }

                    </tbody>
                </table>
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
}

export default ListTodosComponent