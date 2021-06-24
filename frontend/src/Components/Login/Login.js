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
            localStorage.setItem("hash", form.password)
            this.props.history.push('/')
            let response = await axios.post("http://localhost:3001/api/users/login", this.state.form)
            alert(response.status)
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
                <Form validated={this.state.validated} onSubmit={this.test} style={{paddingBottom: '20px'}}>
                    <Form.Group controlId="username" style={{paddingRight: '50px', paddingLeft: '50px', paddingTop: '20px'}} onChange={this.handleChange} name='test'>
                        <Form.Label>Username or Email Address</Form.Label>
                        <Form.Control placeholder="Username/Email" required minLength="3" />
                    </Form.Group>

                    <Form.Group controlId="password" style={{paddingRight: '50px', paddingLeft: '50px'}} onChange={this.handleChange}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" required minLength="3"/>
                    </Form.Group>
                    <Button variant="dark" type="submit" style={{width: "150px"}}>Login</Button>
                </Form>
                </Card>
            </div>
        )
    }
}

export default Login;