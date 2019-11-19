import React from 'react';
import {Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import {Image} from 'react-bootstrap'
import { faFacebook, faHouzz, faYelp } from "@fortawesome/free-brands-svg-icons";
import { faPhone, faEnvelope, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MediaQuery from 'react-responsive'

import './BottomBar.css'
import mainLogo from '../../assets/photos/Logo.png'




const BottomBar = () => {
    return (
         
    <Navbar id="bottomBar" >
      <Navbar.Brand as={Link} to='/'><Image id="bottomLogo" src={mainLogo}/></Navbar.Brand>
            <div style={{display: "flex"}}>
                <div id="createContactAction">
                    <button type="submit" id="submitContactAction">
                        <span id='infoTag'>
                        <a target="_top" href="tel:(888) 535-5206"><FontAwesomeIcon icon={faPhone}/></a>
                            <MediaQuery query="(min-width: 1100px)">(888) 535-5206</MediaQuery>
                        </span>
                    </button>
                </div>
                <div id="createContactAction">
                    <a href={`mailto:appointments@luconstruction.com`}>
                    <button id="submitContactAction">
                        <span id='infoTag'><FontAwesomeIcon icon={faEnvelope}/>
                            <MediaQuery query="(min-width: 1100px)">appointments@luconstructions.com</MediaQuery>
                        </span>
                    </button>
                    </a>
                </div>
                <div id="createContactAction">
                    <a href={`https://www.google.com/maps/place/Lu+Construction/@37.3065198,-121.9505995,15z/data=!4m2!3m1!1s0x0:0xf0e3dc2f722116e5?sa=X&ved=2ahUKEwi2pt6al43iAhVBO30KHc3XAq8Q_BIwCnoECA8QCA`}> 
                        <button id="submitContactAction">
                            <span id='infoTag'><FontAwesomeIcon icon={faMapMarkedAlt}/>
                                <MediaQuery query="(min-width: 1100px)">1101 S Winchester Blvd, San Jose, CA 95117</MediaQuery>
                            </span>
                        </button>
                    </a>
                </div>
            </div>

    </Navbar>
      
      );
}

export default BottomBar


