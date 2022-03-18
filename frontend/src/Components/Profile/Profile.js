import { Component } from 'react';
import Card from 'react-bootstrap/Card'
import './Profile.css'
import axios from 'axios';
import dog from "./test.png"

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                email: '',
                bio: ''
            }
        }
    }

    async getUser(targetUser) { 
        let currentUser = localStorage.getItem("username")
        let authToken = localStorage.getItem("authToken")
        if (!currentUser || !authToken) {
            this.props.history.push('/login');
        }
        let config = {
            headers: {"username": currentUser, "X-Authorization": authToken}
        }
        try {
            let response;
            if (targetUser === currentUser) {
                response = await axios.get(`${process.env.BACKEND_ADDR}/api/users/private/${targetUser}`, config);
            } else {
                response = await axios.get(`${process.env.BACKEND_ADDR}/api/users/${targetUser}`, config);
            }
            this.setState({user: response.data});
            console.log(this.state.user)
        } catch (err) {
            if (err.response.status === 404) {
                this.props.history.push('/404')
                console.log('404')
            }
            console.log(err.response)
        }
    }

    render() {
        return (
            <div>
                <div className="dog">
                    <Card style={{width: '10rem'}}>
                        <Card.Img variant="top" src={dog}/>
                        <Card.Title className='title'>{this.state.user.username}</Card.Title>
                        <Card.Text className='title'>{this.state.user.email}</Card.Text>
                    </Card>
                </div>
                <div className="profile">
                    <Card style={{width: '50rem', border: 'solid'}}>
                        <h2>{this.state.user.bio}</h2>
                    </Card>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.getUser(this.props.match.params.username)
    }
}

export default Profile;