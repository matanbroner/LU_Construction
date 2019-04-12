import React from 'react';
import {Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import {Image} from 'react-bootstrap'
import { faFacebook, faHouzz, faYelp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
            <FontAwesomeIcon icon={faFacebook}/>
            <FontAwesomeIcon icon={faYelp}/>
            <FontAwesomeIcon icon={faHouzz}/>
          </Navbar.Text>
          <Nav.Link as={Link} to='/'>Projects</Nav.Link>
          <Nav.Link as={Link} to='/'>About</Nav.Link>
          <Nav.Link as={Link} to='/'>Testimonials</Nav.Link>
          <Nav.Link as={Link} to='/'>Get an Estimate</Nav.Link>
          <Nav.Link as={Link} to='/'>Contact</Nav.Link>
          <Nav.Link as={Link} to='/signin'>Sign In</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </div>
      );
}

export default NavigationBar


