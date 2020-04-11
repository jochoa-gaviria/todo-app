
import React, { Component } from "react";
import AuthenticationService from "./AuthenticationService";


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
        // //jochoaTest && abcd
        // if(this.state.username==="jochoaTest" && this.state.password==="abcd123"){
        //     AuthenticationService.registerSucessfulLogin(this.state.username,this.state.password)
        //     this.props.history.push(`/welcome/${this.state.username}`)
        //     //this.setState({showSucessMessage:true, hasLoginFailed:false});
        // }else{
        //     console.log('Failed')
        //     this.setState({hasLoginFailed:true, showSucessMessage:false});
        // }
        AuthenticationService.executeBasicAuthenticationService(this.state.username, this.state.password)
        .then(() => {
            AuthenticationService.registerSucessfulLogin(this.state.username,this.state.password)
            this.props.history.push(`/welcome/${this.state.username}`)
        }).catch(() => {
            this.setState({showSuccessMessage:false})
            this.setState({hasLoginFailed:true})
        })
    }

    render(){
        return(
            <div>
                <h1>Login</h1>
                <div className="container"><br/>
                    {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>
                    <ShowLoginSucessful showSucessMessage={this.state.showSucessMessage}/>*/}
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>} {/*This line remplace the component function*/}
                    {this.state.showSucessMessage && <div>Login Sucessful</div>} 
                    UserName: <input type="text" name="username" required value={this.state.username} onChange={this.handleChange}/>
                    Password: <input type="password" name="password" required value={this.state.password} onChange={this.handleChange}/>
                    <div>
                        <br/><button type="button" className="btn btn-primary" onClick={this.loginClicked}>Login</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginComponent