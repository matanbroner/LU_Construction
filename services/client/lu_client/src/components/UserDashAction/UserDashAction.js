
import React from 'react'
import styles from './UserDashAction.css'
import { Link } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserDashAction = (props) => {

    return(
        <Col xs={12} lg={4}>
            <Link to={props.redirect}>
            <Container>
                <Row id="actionWrapper">
                    <Col xs={3} id="actionDisplay" style={{backgroundColor: `${props.background}`}}>
                        <FontAwesomeIcon id="actionDisplayIcon" icon={props.icon}/>
                    </Col>
                    <Col xs={9} id="actionDescription">
                        {props.action}
                    </Col>
                </Row>
            </Container>
            </Link>
        </Col>
    )
}
export default UserDashAction