import { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import axios from 'axios';
const passwords = require('../../passwords');

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                username: '',
                password: ''
            },
            validated: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let form = this.state.form
        form[event.target.id] = event.target.value
        this.setState({form: form})        
    }

    async handleSubmit(event) {
        try {
            let loginReq = {
                username: this.state.form.username,
                password: await passwords.hash(this.state.form.password)
            }
            // let response = await axios.post(`${process.env.REACT_APP_BACKEND_ADDR}/login`, loginReq)
            // let response = await axios.post(`localhost:3000/api/login`, loginReq)
            let response = await fetch('/api/users/login', {method: 'POST', body: loginReq})
            let json = await response.json()
            console.log(json)
            // localStorage.setItem("authToken", json.data.token)
            // localStorage.setItem("username", json.data.username)
            // this.props.history.push('/')
        } catch (err) {
            console.log(err)
            alert(err)
        }
    }


    render() {
        return (
            <div className="login">
                <Card style={{width: '50rem', border: 'solid'}}>
                <Form style={{paddingBottom: '20px'}}>
                    <Form.Group controlId="username" style={{paddingRight: '50px', paddingLeft: '50px', paddingTop: '20px'}} onChange={this.handleChange} name='test'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control placeholder="Username"/>
                    </Form.Group>

                    <Form.Group controlId="password" style={{paddingRight: '50px', paddingLeft: '50px'}} onChange={this.handleChange}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"/>
                    </Form.Group>
                    <Button variant="dark" onClick={this.handleSubmit} style={{width: "150px"}}>Login</Button>
                </Form>
                </Card>
            </div>
        )
    }
}

export default Login;