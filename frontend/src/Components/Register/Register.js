import { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import './Register.css'
import axios from 'axios';
const passwords = require('../../passwords');

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                username: '',
                email: '',
                password: ''
            },
            validated: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleChange(event) {
        let form = this.state.form
        form[event.target.id] = event.target.value
        this.setState({form: form})     
    }

    async handleSubmit(event) {
        try {
            let form = this.state.form
            form["password"] = await passwords.hash(form.password)
            await axios.post(`${process.env.BACKEND_ADDR}/api/users/register`, form)
            let loginResponse = await axios.post(`${process.env.BACKEND_ADDR}/api/users/login`, {"username": form.username, "password": form.password})
            localStorage.setItem("authToken", loginResponse.data.token)
            localStorage.setItem("username", loginResponse.data.username)
            this.props.history.push('/')
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
                        <Form.Control placeholder="Username" required minLength="3" />
                        <Form.Text className="text-muted">
                            Used to login and as your display name (changeable later)
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="email" style={{paddingRight: '50px', paddingLeft: '50px'}} onChange={this.handleChange}>
                        <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Email" />
                    </Form.Group>

                    <Form.Group controlId="password" style={{paddingRight: '50px', paddingLeft: '50px'}} onChange={this.handleChange}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" required minLength="3"/>
                        <Form.Text className="text-muted"> 
                            Maybe not your universal password, security is implemented but untested
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" onClick={this.handleSubmit}>Become a Jim</Button>
                </Form>
                </Card>
            </div>
        )
    }
}

export default Register;