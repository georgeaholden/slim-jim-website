import { Component } from 'react';
import rando from '../random.png'
import Image from 'react-bootstrap/Image'
import './HomePage.css'

class HomePage extends Component {
    render() {
        return (
            <div class="Picture">
                <Image src={rando}></Image>
            </div>            
        )
    }
}

export default HomePage;