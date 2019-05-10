import React from 'react'
import styles from './AboutPage.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'

class AboutPage extends React.PureComponent{
    constructor(){
        super()

        this.state={}
    }

    render(){
        return(
            <div id="aboutPageWrapper">
                <div className="bannerimageAbout">
                    <Jumbotron fluid>
                        <Container>
                            <h1 id="jumbotronTitleAbout">WHO WE ARE</h1>
                            <p id="jumbotronTextAbout">
                            Rest assured that with us, your dreams are in safe hands.
                            </p>
                        </Container>
                    </Jumbotron>
                </div>
                <Row id="aboutContentRow">
                    <Col className='d-none d-lg-block'>
                        <div id="aboutUsImageMinor">
                        </div>
                    </Col>
                    <Col xs={12} md={6} id="aboutParag">
                    <h5 id="aboutParagHeader">Why us over the comptetiton?</h5>
                    We at LU Construction do Home Remodeling, Renovations, Home Improvements and Construction Services through Advanced Builders & Contractors.
                    Not only must your home provide you with the shelter you need, but it must also satisfy your tastes and stylistic preferences. 
                    In order to do so, your house must be designed, constructed, renovated and improved by skilled, qualified general contractors.
                    </Col>
                </Row>
            </div>
        )
    }
}

export default AboutPage