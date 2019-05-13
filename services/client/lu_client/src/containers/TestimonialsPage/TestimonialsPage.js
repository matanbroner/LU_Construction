import React from 'react'

import styles from './TestimonialsPage.css'

import TestimonialCreator from '../../components/TestimonialCreator/TestimonialCreator'
import TestimonialItem from '../../components/TestimonialItem/TestimonialItem'
import Spinner from '../../components/Spinner/Spinner'

import { Row, Col } from 'react-bootstrap'
var superagent = require('superagent')
const uuid = require('uuid')


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
            return <TestimonialItem key={uuid()} item={item}/>
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