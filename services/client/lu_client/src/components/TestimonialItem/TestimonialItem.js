import React, {useState} from 'react'
import colors from '../../assets/constants/colors'
import styles from './TestimonialItem.css'

import StarRatings from 'react-star-ratings';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'



const TestimonialItem = (props) => {

    const [fullLength, readMore] = useState(false);

    const renderDescription = () => {
        if(props.item.description.length > 300 && fullLength)
            return(
                <div>
                    <p id="testimonialBody">
                        {props.item.description}
                    </p>
                    <span id="readMoreButton" onClick={() => readMore(false)}>Read Less</span>
                </div>
            )
        else if (props.item.description.length > 300 && !fullLength)
            return(
                <div>
                    <p id="testimonialBody">
                        {props.item.description.substring(0,300)}
                        ...
                    </p>
                    <span id="readMoreButton" onClick={() => readMore(true)}>Read More</span>
                </div>
            )
        else return(
            <p id="testimonialBody">
                    {props.item.description}
            </p>
        )
    }

    return(
       <Col xs={12} id="testimonialItemWrapper">
           <Row>
                <Col xs={8}>
                    <Row>
                        <Col xs={2}>
                            <FontAwesomeIcon id="userIcon" style={{color: props.item.color}} icon={faUserCircle}/>
                        </Col>
                        <Col xs={10}>
                            <span id="testimonialName">{props.item.name}</span>
                            <span id="testimonialProject">{props.item.relationship}</span>  
                            {renderDescription()}
                        </Col>
                    </Row>
               </Col>
               <Col xs={4} id="testimonialStars">
               <StarRatings
                starDimension={window.innerHeight > window.innerWidth ? "1.7vh" : "2.2vw"}
                starSpacing='2px'
                rating={props.item.rating}
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