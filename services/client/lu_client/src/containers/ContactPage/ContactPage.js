import React from 'react'
import styles from './ContactPage.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

import EstimateCreator from '../../components/EstimateCreator/EstimateCreator'

class ContactPage extends React.PureComponent{
    constructor(){
        super()

        this.state = {}
    }

    render(){
        return(
            <div id="allContactPageContent">
                <h2 id="contactPageTitle">
                    Contact Us
                </h2>
                <Row>
                    <Col xs={12} lg={2}>
                    <div id="contactInfoWrapper">
                    Our Information
                    </div>
                    </Col>
                    <Col xs={12} lg={7}>
                    <EstimateCreator/>
                    </Col>
                    <Col className="d-none d-lg-block" lg={3}>
                        <div class="mapouter">
                            <div class="gmap_canvas">
                            <iframe width="550" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=LU%20Construction&t=&z=15&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
                            </iframe>
                            <a href="https://www.emojilib.com">emojilib.com</a>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ContactPage