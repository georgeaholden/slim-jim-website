import { Component } from 'react';
import Card from 'react-bootstrap/Card'
import './Profile.css'
import axios from 'axios';

class Profile extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            user: {}
        }
    }

    async getUser(id) {
        this.setState({user: {username: 'john'}})
    }

    render() {
        return (
            <div className="profile">
                <Card style={{width: '50rem', border: 'solid'}}>
                    <h1>{this.state.user.username}</h1>
                </Card>
            </div>
        )
    }

    async componentDidMount() {
        await this.getUser(10)
    }
}

export default Profile;