import React from 'react'

import styles from './TestimonialsPage.css'
import MediaQuery from 'react-responsive';

import TestimonialCreator from '../../components/TestimonialCreator/TestimonialCreator'
import TestimonialItem from '../../components/TestimonialItem/TestimonialItem'
import ScrollableSection from '../../components/ScrollableSection/ScrollableSection'
import Spinner from '../../components/Spinner/Spinner'

import { Row, Col } from 'react-bootstrap'
var superagent = require('superagent')


let lorem1 = "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
let lorem2= "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
class TestimonialsPage extends React.PureComponent{
    constructor(props){
        super(props)

        this.state = {
            items: [],
            loading: true
        }
    }

    componentDidMount(){
        this.fetchTestimonials()
    }

    fetchTestimonials(){
        superagent
        .get('/service/testimonials/all')
        .then(res => this.setState({items: res.body, loading: false}))
    }


    renderTestimonials(){
        return this.state.items.map(item => {
            return <TestimonialItem item={item}/>
        })
    }

    render(){
        return(
            this.state.loading 
            ? <Spinner/>
            : <div>
                <Row id="testimonialPageWrapper">
                    <Col id="testimonialCollection">
                    <h2 id="testimonialsHeader">Our customers love us!</h2>
                            <Row id="testimonialColumn">
                    
                                {this.renderTestimonials()}
                            
                            </Row>                 
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