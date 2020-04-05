import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'
import { withRouter } from 'react-router';

class HeaderComponent extends Component{
    // constructor(props){
    //     super(props)
    //     this.state={
    //         isUserLogIn:false
    //     }
    // }

    // updateRender(){
    //     this.setState({
    //         isUserLogIn : AuthenticationService.isUserLoggedIn
    //     })
    // }

    render(){
        var isUserLogIn = AuthenticationService.isUserLoggedIn()
        return(
            
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a className="navbar-brand" href="https://github.com/jochoa-gaviria">My GitHub</a></div>
                    <ul className="navbar-nav">
                        {isUserLogIn && <li><Link className="nav-link" to="/welcome/jochoaTest">Home</Link></li>}
                        {isUserLogIn && <li><Link className="nav-link" to="/todos">TODOS</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLogIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                        {isUserLogIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

export default withRouter(HeaderComponent);  //Important for dynamic menu