import React from 'react'
import styles from './ContactPage.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import MediaQuery from 'react-responsive'
import GoogleMapReact from 'google-map-react';
import EstimateCreator from '../../components/EstimateCreator/EstimateCreator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMap, faEnvelope } from '@fortawesome/free-solid-svg-icons'


class ContactPage extends React.PureComponent{
    constructor(){
        super()

        this.state = {}
    }


    renderContactInfo(){
        return(
            <div id="contactInfo">
                <FontAwesomeIcon icon={faPhone}/> (888) 535-5206
                <div id="seperatorContact"><FontAwesomeIcon icon={faMap}/> 1101 S Winchester Blvd, San Jose, CA 95117</div>
                <FontAwesomeIcon icon={faEnvelope}/> appointments@luconstruction.com
            </div>
        )
    }

    renderMobileContactInfo(){
        return(
            <div id="mobileContactInfo">
                <FontAwesomeIcon icon={faPhone}/> (888) 535-5206
                <hr/>
                <FontAwesomeIcon icon={faMap}/> 1101 S Winchester Blvd, San Jose, CA 95117
                <hr/>
                <FontAwesomeIcon icon={faEnvelope}/> appointments@luconstruction.com
                <hr/>
            </div>
        )
    }

    renderMap(){
        console.log("trigger map")
        const defaultProps = {
            center: {lat: 37.306597, lng: -121.95},
            zoom: 15
          };
        return (<div id="mapWrapper">
                    <GoogleMapReact
                        bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAP_API_KEY}}
                        defaultCenter={defaultProps.center}
                        defaultZoom={defaultProps.zoom}
                        yesIWantToUseGoogleMapApiInternals
                    >
                    <MapMarker 
                        lat={37.306597} 
                        lng={-121.95} 
                        text={'Kreyser Avrora'} 
                        />
                    </GoogleMapReact>
                </div>)
    }

    renderStandardView(){
        return(
            <div id="allContactPageContent">
                <h2 id="contactPageTitle">
                    Contact Us
                </h2>
                <p id="contactPrompt">
                    Please feel welcome to send us inquiries about any projects you may have in mind. <br/>
                    Our team is dedicated to making your dreams come true!
                    <hr/>
                    {this.renderContactInfo()}
                    <hr id="contactDivider"/>
                </p>
                <Row id="contentRow">
                    <Col id="mapColumn" lg={5}>
                        {this.renderMap()}
                    </Col>
                    <Col xs={12} lg={6}>
                        <EstimateCreator/>
                    </Col>
                </Row>
            </div>
        )
    }

    renderMobileView(){
        return(
            <div id="allContactPageContentMobile">
                <h2 id="contactPageTitle">
                    Contact Us
                </h2>
                <p id="contactPromptMobile">
                    Please feel welcome to send us inquiries about any projects you may have in mind. <br/>
                    Our team is dedicated to making your dreams come true!
                    <hr/>
                    {this.renderMobileContactInfo()}
                </p>
                <Row>
                    <Col xs={12}>
                        <EstimateCreator/>
                    </Col>
                </Row>
            </div>
        )
    }

    render(){
        return(
            <div>
                <MediaQuery query="(max-device-width: 1224px)">
                    {this.renderMobileView()}
                </MediaQuery> 
                <MediaQuery query="(min-device-width: 1225px)">
                    {this.renderStandardView()}
                </MediaQuery> 
            </div>
        )
    }
}

const MapMarker = ({ text }) => (
    <div id="mapMarker">
    </div>
  );

export default ContactPage