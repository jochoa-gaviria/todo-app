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
        // HelloWorldService.executedHelloWorldService()
        // .then(response => this.handleSuccesfulResponse(response))
        // HelloWorldService.executedHelloBeanWorldService()
        // .then(response => this.handleSuccesfulResponse(response))
        HelloWorldService.executedHelloWorldPathVariableService(this.props.match.params.name) /*is because on login (push method) it was send the property*/
        .then(response => this.handleSuccesfulResponse(response))
        .catch(error => this.handleError(error))
    }

    handleSuccesfulResponse(response){
        console.log(response)
        this.setState({welcomeMessage:response.data.message})   
    }
    handleError(error){
        console.log(error.response)
        this.setState({welcomeMessage:error.response.data.message})
    }
}
export default WelcomeComponent