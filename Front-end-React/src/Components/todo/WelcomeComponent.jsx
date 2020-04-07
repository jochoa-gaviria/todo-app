import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import HelloWorldService from '../../api/todo/helloWorldService.js'


class WelcomeComponent extends Component{
    constructor(props){
        super(props)
        this.retriveWelcomeMessage=this.retriveWelcomeMessage.bind(this)
        this.handleSuccesfulResponse=this.handleSuccesfulResponse.bind(this)
        this.state = {
            welcomeMessage : ''
        }
    }
    
    render(){
    return (
        <>
            <h1>Welcome</h1>
            <div className="container">
                Welcome - {this.props.match.params.name} - You can manage your todos <Link to="/todos"> Here</Link>
            </div>
            <div className="container">
                Click here to get a customized Welcome message
                <br/><button className="btn btn-success" onClick={this.retriveWelcomeMessage}>Message</button>
            </div>
            <div>
                {this.state.welcomeMessage}
            </div>
        </>
    )
    }

    retriveWelcomeMessage(){
        HelloWorldService.executedHelloWorldService()
        .then(response => this.handleSuccesfulResponse(response))
        .catch()
    }

    handleSuccesfulResponse(response){
        this.setState({welcomeMessage:response.data})        
    }
}
export default WelcomeComponent