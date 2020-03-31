import React, {Component} from 'react'

class TodoApp extends Component {
    render(){
        return (
            <div className="todoApp">
                <LoginComponent/>
            </div>
        )
    }
}

class LoginComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: 'jochoaTest',
            password : ''
        }
        // this.handleUserNameChange = this.handleUserNameChange.bind(this)
        // this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
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

    render(){
        return(
            <div className="loginComponent"><br/>
                UserName: <input type="text" name="username" required value={this.state.username} onChange={this.handleChange}/>
                Password: <input type="password" name="password" required value={this.state.password} onChange={this.handleChange}/>
                <div className="loginButton">
                    <br/><button>Login</button>
                </div>
            </div>
        )
    }
}

export default TodoApp