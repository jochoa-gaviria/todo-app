import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import HeaderComponent from './HeaderComponent'
import AuthenticatedRoute from './AuthenticatedRoute'
import LoginComponent from './LoginComponent'
import LogoutComponent from './LogoutComponent'
import FooterComponent from './FooterComponent'
import WelcomeComponent from './WelcomeComponent'
import ListTodosComponent from './TodoListComponent'
import ErrorComponent from './ErrorComponent'
import TodoComponent from './TodoComponent'

class TodoApp extends Component {
    render(){
        return (
            <div className="todoApp">
                <Router>
                    <>
                        <HeaderComponent/>
                        <Switch> {/*Guarantees that only one of the routes will show*/}
                            <Route path="/" exact component={LoginComponent}/>
                            <Route path="/login" component={LoginComponent}/>
                            <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
                            <AuthenticatedRoute exact path="/todos" component={ListTodosComponent}/>
                            <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
                            <AuthenticatedRoute path="/todos/:id" component={TodoComponent}/>
                            <Route component={ErrorComponent}/>
                        </Switch>
                        <FooterComponent/>
                    </>
                </Router>
                    {/*<LoginComponent/>
                    <WelcomeComponent/>*/}
            </div>
        )
    }
}
// function ShowInvalidCredentials(props){
//     if(props.hasLoginFailed)
//         return  <div>Invalid Credentials</div> 
//     return null
// }

// function ShowLoginSucessful(props){
//     if(props.showSucessMessage)
//         return <div>Login Sucessful</div>
//     return null
// }

export default TodoApp