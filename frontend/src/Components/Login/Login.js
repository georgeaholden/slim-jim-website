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
                loginInput: '',
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
            let form = this.state.form
            form["password"] = await passwords.hash(form.password)
            let response = await axios.post("http://localhost:3001/api/users/login", this.state.form)
            localStorage.setItem("AuthToken", response.data.token)
            localStorage.setItem("userId", response.data.userId)
            this.props.history.push('/')
        } catch (err) {
            alert(err)
        }
    }

    async test(event) {
        this.props.history.push('/)')
    }

    render() {
        return (
            <div className="login">
                <Card style={{width: '50rem', border: 'solid'}}>
                <Form style={{paddingBottom: '20px'}}>
                    <Form.Group controlId="loginInput" style={{paddingRight: '50px', paddingLeft: '50px', paddingTop: '20px'}} onChange={this.handleChange} name='test'>
                        <Form.Label>Username or Email Address</Form.Label>
                        <Form.Control placeholder="Username/Email"/>
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