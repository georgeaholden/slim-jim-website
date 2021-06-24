import { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import sjlogo from './sjlogo.svg'


class Navibar extends Component {
    showLogin(location) {
        return location !== "/login"
    }

    showRegister(location) {
        return location === "/login"
    }

    render() {
        return (
            <div>
                <Navbar bg="dark" sticky="top">
                    <Navbar.Brand href="/">
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
                    </Navbar.Collapse>  
                </Navbar>
            </div>
        )
    }
}

export default Navibar;