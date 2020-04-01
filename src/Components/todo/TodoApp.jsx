import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

class TodoApp extends Component {
    render(){
        return (
            <div className="todoApp">
                <Router>
                    <Route path="/" exact component={LoginComponent}/>
                    <Route path="/Login" component={LoginComponent}/>
                    <Route path="/Welcome" component={WelcomeComponent}/>
                </Router>
                    {/*<LoginComponent/>
                    <WelcomeComponent/>*/}
            </div>
        )
    }
}

class LoginComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: 'jochoaTest',
            password : '',
            hasLoginFailed : false,
            showSucessMessage : false
        }
        // this.handleUserNameChange = this.handleUserNameChange.bind(this)
        // this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }


    //IMPORTANT: the name of the input needs to be the same and the name of state field 
    handleChange(event){
        //console.log(event.target.value);
        console.log(event.target.name)
        this.setState ({
            [event.target.name] //Remplace the name of state field that will be change
                :event.target.value
        })
    }


    // It was restructured with hadleChange
    // handleUserNameChange(event){
    //     //console.log(event.target.value);
    //     this.setState ({username:event.target.value})
    // }

    // handlePasswordChange(event){
    //     this.setState({password:event.target.value})
    // }

    loginClicked(){
        //jochoaTest && abcd
        if(this.state.username==="jochoaTest" && this.state.password==="abcd"){
            console.log('Sucessful')
            this.setState({showSucessMessage:true, hasLoginFailed:false});
        }else{
            console.log('Failed')
            this.setState({hasLoginFailed:true, showSucessMessage:false});
        }
    }

    render(){
        return(
            <div className="loginComponent"><br/>
                {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>
                <ShowLoginSucessful showSucessMessage={this.state.showSucessMessage}/>*/}
                {this.state.hasLoginFailed && <div>Invalid Credentials</div>} {/*This line remplace the component function*/}
                {this.state.showSucessMessage && <div>Login Sucessful</div>} 
                UserName: <input type="text" name="username" required value={this.state.username} onChange={this.handleChange}/>
                Password: <input type="password" name="password" required value={this.state.password} onChange={this.handleChange}/>
                <div className="loginButton">
                    <br/><button onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        )
    }
}

class WelcomeComponent extends Component{
    render(){
        return <div>Welcome - Juan</div>
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