import React from 'react'
import colors from '../../assets/constants/colors'
import styles from './TestimonialItem.css'

import StarRatings from 'react-star-ratings';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'

var randomColor = require('randomcolor'); // import the script
var color = randomColor();


const TestimonialItem = (props) => {

    return(
       <Col xs={12} id="testimonialItemWrapper">
           <Row>
                <Col xs={8}>
                    <Row>
                        <Col xs={2}>
                            <FontAwesomeIcon id="userIcon" style={{color: `${randomColor({luminosity: 'bright'})}`}} icon={faUserCircle}/>
                        </Col>
                        <Col xs={10}>
                            <span id="testimonialName">Matan Broner</span>
                            <span id="testimonialProject">New Construction</span>  
                            <p id="testimonialBody">
                                {props.description}
                            </p>
                        </Col>
                    </Row>
               </Col>
               <Col xs={4} id="testimonialStars">
               <StarRatings
                starDimension={window.innerHeight > window.innerWidth ? "1.7vh" : "2.2vw"}
                starSpacing='2px'
                rating={5}
                starRatedColor="#f6cd49"
                numberOfStars={5}
                name='rating'
                />
               </Col>
           </Row>
       </Col>
    )
}

export default TestimonialItem