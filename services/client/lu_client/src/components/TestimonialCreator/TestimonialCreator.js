
import React from 'react'
import styles from './TestimonialCreator.css'
import colors from '../../assets/constants/colors'

import { faThumbsUp, faTh} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import StarRatings from 'react-star-ratings';
import Container from 'react-bootstrap/Container'
var uuid = require('uuid')
var randomColor = require('randomcolor'); // import the script
var superagent = require('superagent')

class TestimonialCreator extends React.PureComponent{
    constructor(){
        super()

        this.state = {
            id: '',
            rating: 0,
            name: '',
            relationship: '',
            email: '',
            projectType: 'New Construction',
            body: '',
            submitted: false
        }
        this.updateState = this.updateState.bind(this)
        this.submitTestimonial = this.submitTestimonial.bind(this)
    }

    componentDidMount(){
        this.setState({id: uuid(), color: randomColor()})
    }

    resetState(){
        this.setState({
            id: uuid(),
            rating: 0,
            color: randomColor(),
            name: '',
            relationship: '',
            email: '',
            projectType: 'New Construction',
            body: ''
        })
    }

    updateState(e){
        let param =  e.target.id
        let value = e.target.value
        this.setState({[param]: value})
    }

    changeRating(rating){
        this.setState({rating: rating})
    }

    submitTestimonial(e){
        e.preventDefault()
        let testimonial = this.state
        this.setState({submitted: true}, this.resetState())
        superagent
        .post('/service/testimonials/api/create')
        .send({testimonial: testimonial})
        .end((err, res) => {
            if (err) console.log(err)
            else this.setState({
                rating: 0,
                name: '',
                projectType: '',
                email: '',
                relationship: '',
                description: ''
            }, this.forceUpdate())
        })
    }

    render(){
        return(
            <Container id="allContent">
                <h3 id="testimonialCreateTitle">
                    Were you satisfied by LU Contruction?
                    <br/>
                    Tell us about it!
                </h3>
                 <div id="reviewwrapper">
                    <div>
                        <StarRatings
                        rating = {this.state.rating}
                        starHoverColor={colors.starsFill}
                        starRatedColor={colors.starsFill}
                        starDimension='40px'
                        changeRating={(r) => this.changeRating(r)}
                        />
                        <form role="form" id="reviewform" onSubmit={this.submitTestimonial}>
                                <div className="form-group">
                                    <label id="reviewlabel" htmlFor="name">Your name:</label>
                                    <input onChange={this.updateState} type="name" className="form-control" id="name" placeholder="Enter your name" required/>
                                </div>
                                <div className="form-group">
                                    <label id="reviewlabel" htmlFor="email">Your email:</label>
                                    <input onChange={this.updateState} type="email" className="form-control" id="email" placeholder="Enter your email" required/>
                                </div>
                                <div className="form-group">
                                <label id="reviewlabel" htmlFor="projectType">Project type:</label>
                                    <select id="projectType" onChange={this.updateState}>
                                        <option disabled selected>Choose an project type</option>
                                        <option value="New Construction">New Construction</option>
                                        <option value="Bathroom Remodel">Bathroom Remodel</option>
                                        <option value="Kitchen Remodel">Kitchen Remodel</option>
                                        <option value="Garage Conversion">Garage Conversion</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                <label id="reviewlabel" htmlFor="relationship">Relationship to LU Construction:</label>
                                    <select id="relationship" onChange={this.updateState}>
                                        <option disabled selected>Choose an option</option>
                                        <option value="Client">I hired LU Construction.</option>
                                        <option value="Professional">I was hired by or worked with LU Construction.</option>
                                        <option value="Prospect Client">I received an estimate from LU Construction.</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="form-group" id="descriptionDiv">
                                    <label id="reviewlabel" htmlFor="description">Describe your experience:</label>
                                    <textarea onChange={this.updateState} className="form-control" id="description" rows="3"></textarea>
                                </div>
                                {
                                    this.state.submitted
                                    ? <button type="submit" disabled id="submitreview" className="btn btn-primary">Thanks For Your Feedback!</button>
                                    : <button type="submit" id="submitreview" className="btn btn-primary">Submit Testimonial</button>
                                }	

                        </form>
                        </div>
                    </div>
                
            </Container>
        )
    }
}

export default TestimonialCreator
