import React from 'react'
import styles from './ProjectPreview.css'
import Col from 'react-bootstrap/Col'

import { faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProjectPreview = (props) => {

    var styles = {
        backgroundImage: "url("+props.image+")"
    }

    return(
        <Col md={props.colSize} xs={12} id="container">
            <div id="wrap">
            <div id="image" style={styles}/>
            <div id="location">
                {props.location.substring(0,15)}
                {props.location.length > 15 ? '...' : null} 
                <FontAwesomeIcon id="locationIcon" icon={faMapMarkerAlt}/>
            </div>
            </div>
            <div id="descriptionWrapper">
                <span id="description"><strong>House Built From the Ground Up in San Jose</strong></span>
                <br/>
                <span id="photos">36 Photos</span>
            </div>
        </Col>
    )
}

export default ProjectPreview