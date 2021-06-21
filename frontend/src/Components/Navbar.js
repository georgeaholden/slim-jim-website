import { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import sjlogo from './sjlogo.svg'


class Navibar extends Component {
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
                        <Button variant="light" href="/login">Login</Button>
                    </Navbar.Collapse>  
                </Navbar>
            </div>
        )
    }
}

export default Navibar;