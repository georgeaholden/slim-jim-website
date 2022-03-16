import { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import sjlogo from './sjlogo.svg'
import { withRouter } from "react-router-dom";


class Navibar extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    showLogin(location) {
        return location !== "/login" && !localStorage.username
    }

    showRegister(location) {
        return location === "/login" && !localStorage.username
    }
    
    showTest(location) {
        return localStorage.username
    }

    showLogout(location) {
        return localStorage.username
    }

    brandRedirect() {
        if (localStorage.username) {
            return "/profile/" + localStorage.getItem("username");
        } else {
            return "/"
        }
    }

    logout() {
        localStorage.removeItem("username");
        localStorage.removeItem("authToken");
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <Navbar bg="dark" sticky="top">
                    <Navbar.Brand href={this.brandRedirect()}>
                        <img
                             src={sjlogo}
                             width="40"
                             height="40"
                             className="d-inline-block align-top"
                             alt="SJ Logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        {this.showLogin(window.location.pathname) && <Button variant="light" href="/login">Login</Button>}
                        {this.showRegister(window.location.pathname) && <Button variant="light" href="/register">Create an Account</Button>}
                        {this.showLogout() && <Button variant="light" onClick={this.logout}>Logout</Button>}
                    </Navbar.Collapse>  
                </Navbar>
            </div>
        )
    }
}

export default withRouter(Navibar);