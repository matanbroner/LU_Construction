
import React from 'react'
import styles from './TestimonialCreator.css'
import colors from '../../assets/constants/colors'

import StarRatings from 'react-star-ratings';
import Container from 'react-bootstrap/Container'

class TestimonialCreator extends React.PureComponent{
    constructor(){
        super()

        this.state = {
            rating: 0,
            name: '',
            email: '',
            projectType: 'New Construction',
            description: ''
        }
        this.updateState = this.updateState.bind(this)
    }

    updateState(e){
        let param = e.target.id
        let value = e.target.value
        this.setState({[param]: value})
    }

    changeRating(rating){
        this.setState({rating})
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
                    <StarRatings
                    rating = {this.state.rating}
                    starHoverColor={colors.starsFill}
                    starRatedColor={colors.starsFill}
                    starDimension='40px'
                    changeRating={(r) => this.changeRating(r)}
                    />
                    <form role="form" id="reviewform">
                            <div className="form-group">
                                <label id="reviewlabel" for="name">Your name:</label>
                                <input onChange={this.updateState} type="name" className="form-control" id="name" placeholder="Enter your name" required/>
                            </div>
                            <div className="form-group">
                                <label id="reviewlabel" for="email">Your email:</label>
                                <input onChange={this.updateState} type="email" className="form-control" id="email" placeholder="Enter your email" required/>
                            </div>
                            <div className="form-group">
                            <label id="reviewlabel" for="projectType">Project type:</label>
                                <select id="projectType" onChange={this.updateState}>
                                    <option selected value="New Construction">New Construction</option>
                                    <option value="Bathroom Remodel">Bathroom Remodel</option>
                                    <option value="Kitchen Remodel">Kitchen Remodel</option>
                                    <option value="Garage Conversion">Garage Conversion</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label id="reviewlabel" for="description">Describe your experience:</label>
                                <textarea onChange={this.updateState} className="form-control" id="description" rows="3"></textarea>
                            </div>
                        <button type="submit" id="submitreview" className="btn btn-primary">Submit</button>	

                    </form>
                </div>
            </Container>
        )
    }
}

export default TestimonialCreator
