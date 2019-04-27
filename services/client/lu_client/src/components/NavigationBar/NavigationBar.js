import React from 'react';
import {Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import {Image} from 'react-bootstrap'
import { faFacebook, faHouzz, faYelp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import urls from '../../assets/constants/urls'

import './NavigationBar.css'
import mainLogo from '../../assets/photos/Logo.png'




const NavigationBar = () => {
    return (
      <div>
        
        
      <Navbar expand="lg" sticky="top">
      <Navbar.Brand as={Link} to='/'><Image className="mainLogo" src={mainLogo}/></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        </Nav>
        <Nav>
          <Navbar.Text>
            <a href={urls.facebook}><FontAwesomeIcon icon={faFacebook}/></a>
            <a href={urls.yelp}><FontAwesomeIcon icon={faYelp}/></a>
            <a href={urls.houzz}><FontAwesomeIcon icon={faHouzz}/></a>
          </Navbar.Text>
          <Nav.Link as={Link} to='/'>Home</Nav.Link>
          <Nav.Link as={Link} to='/projects'>Projects</Nav.Link>
          <Nav.Link as={Link} to='/'>About</Nav.Link>
          <Nav.Link as={Link} to='/testimonials'>Testimonials</Nav.Link>
          <Nav.Link as={Link} to='/contact'>Contact</Nav.Link>
          <Nav.Link as={Link} to='/sign_in'>{localStorage.getItem('jwtToken') ? 'Profile' : 'Sign In'}</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </div>
      );
}

export default NavigationBar


