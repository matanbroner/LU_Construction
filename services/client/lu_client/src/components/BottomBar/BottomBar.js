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
                <form action="tel:4084100240" id="createContactAction">
                    <button type="submit" id="submitContactAction">
                        <span id='infoTag'><FontAwesomeIcon icon={faPhone}/>
                            <MediaQuery query="(min-width: 1100px)">(408) 547-9833</MediaQuery>
                        </span>
                    </button>
                </form>
                <form action="email:matanbroner@gmail.com" id="createContactAction">
                    <button type="submit" id="submitContactAction">
                        <span id='infoTag'><FontAwesomeIcon icon={faEnvelope}/>
                            <MediaQuery query="(min-width: 1100px)">lu_construction@gmail.com</MediaQuery>
                        </span>
                    </button>
                </form>
                <form action="/https://goo.gl/maps/efmKZoeS3eL2" id="createContactAction">
                    <button type="submit" id="submitContactAction">
                        <span id='infoTag'><FontAwesomeIcon icon={faMapMarkedAlt}/>
                            <MediaQuery query="(min-width: 1100px)">3040 Winchester Avenue, San Jose CA</MediaQuery>
                        </span>
                    </button>
                </form>
            </div>
            <div id="socialTags">
                <FontAwesomeIcon icon={faFacebook}/>
                <FontAwesomeIcon icon={faYelp}/>
                <FontAwesomeIcon icon={faHouzz}/>
            </div>  
    </Navbar>
      
      );
}

export default BottomBar


