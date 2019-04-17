import React from 'react'

import styles from './TestimonialsPage.css'
import MediaQuery from 'react-responsive';

import TestimonialCreator from '../../components/TestimonialCreator/TestimonialCreator'
import TestimonialItem from '../../components/TestimonialItem/TestimonialItem'
import ScrollableSection from '../../components/ScrollableSection/ScrollableSection'

import { Row, Col } from 'react-bootstrap'

let lorem1 = "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
let lorem2= "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
class TestimonialsPage extends React.PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        let items = []
        for (let i =0; i< 20; i++){
            if (i %2 === 0)
                items.push(<TestimonialItem description={lorem1}/>)
            else items.push(<TestimonialItem description={lorem2}/>)
        }
        return(
            <div>
                <Row id="testimonialPageWrapper">
                    <Col id="testimonialCollection">
                    <h3 id="testimonialsHeader">Our customers love us!</h3>
                        <MediaQuery query="(min-width: 900px)">
                            <Row id="testimonialColumn">
                    
                                {items}
                            
                            </Row>
                        </MediaQuery>
                        <MediaQuery query="(max-width: 901px)">
                            <ScrollableSection orient='x'>
                                {items}
                            </ScrollableSection>
                        </MediaQuery>
                    </Col>
                    <Col md={5} id="createPanel">
                        <TestimonialCreator/>
                    </Col>
                </Row>

            </div>
        )
    }
}

export default TestimonialsPage