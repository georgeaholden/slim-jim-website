import { Component } from 'react';
import rando from '../random.png'
import Image from 'react-bootstrap/Image'
import './HomePage.css'

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'a'
        }
    }

    render() {
        return (
            <div className="Picture">
                <h1>{this.state.message}</h1>
                <Image src={rando}></Image>
            </div>            
        )
    }

    componentDidMount() {
        fetch('/api').then(response => response.json()).then(state => this.setState(state))
    }
}

export default HomePage;