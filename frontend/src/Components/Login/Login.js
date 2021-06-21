import { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import './Login.css'
import axios from 'axios';

class Login extends Component {
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
    }

    handleChange(event) {
        let form = this.state.form
        form[event.target.id] = event.target.value
        this.setState({form: form})
        console.log(this.state.form)
        console.log(event.target.value)
        
    }

    handleSubmit(event) {
        console.log('cool')
    }

    render() {
        return (
            <div className="login">
                <Card style={{width: '50rem', border: 'solid'}}>
                <Form validated={this.state.validated} onSubmit={this.handleSubmit} style={{paddingBottom: '20px'}}>
                    <Form.Group controlId="username" style={{paddingRight: '50px', paddingLeft: '50px', paddingTop: '20px'}} onChange={this.handleChange} name='test'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control placeholder="Username" required minLength="3" />
                        <Form.Text className="text-muted">
                            What others will see you as
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
                            Please use a password you don't use anywhere else, security is questionable at best
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">Become a Jim</Button>
                </Form>
                <h1>{this.state.form.username}</h1>
                <h1>{this.state.form.password}</h1>
                <h1>{this.state.form.email}</h1>
                </Card>
            </div>
        )
    }
}

export default Login;