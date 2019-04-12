import React from 'react';
import {Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import {Image} from 'react-bootstrap'
import { faFacebook, faHouzz, faYelp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './BottomBar.css'
import mainLogo from '../../assets/photos/Logo.png'




const BottomBar = () => {
    return (
         <div id="mainBar">
    <Navbar id="bottomBar" >
      <Navbar.Brand as={Link} to='/'><Image id="bottomLogo" src={mainLogo}/></Navbar.Brand>
            <div id="socialTags">
                <FontAwesomeIcon icon={faFacebook}/>
                <FontAwesomeIcon icon={faYelp}/>
                <FontAwesomeIcon icon={faHouzz}/>
            </div>  
    </Navbar>
        </div>
      );
}

export default BottomBar


