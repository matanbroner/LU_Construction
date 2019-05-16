import React from 'react'
import styles from './EstimateCreator.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

var superagent = require('superagent')
 

class EstimateCreator extends React.Component{
    constructor(){
        super()

        this.state = {

        }
        this.updateState = this.updateState.bind(this)
        this.sendEstimate = this.sendEstimate.bind(this)
    }

    componentDidMount(){
    }

    sendEstimate(e){
        let body = {
            name: this.state.name,
            projectType: this.state.projectType,
            email: this.state.email,
            description: this.state.description || 'No further description provided.'
        }
        superagent
        .post(process.env.REACT_APP_TESTIMONIALS_URL + '/estimate/send')
        .set({'Authorization': localStorage.jwtToken})
        .send(body)
        .then(res => console.log(res.body))
    }

    updateState(e){
        let param = e.target.id
        let val = e.target.value
        this.setState({[param]: val})
    }

    render(){
        return(
            <div id="estimateCreatorWrapper">
                <h3 id="estimateCreatorHeader">Tell us a bit about your project!</h3>
                <form id="estimateForm" onSubmit={this.sendEstimate}>
                <Col>
                    <Row>
                        <Col xs={12} md={6}>
                            <Row>
                            <Col>
                                <div className="form-group">
                                    <label htmlFor="name" id="estimateFormLabel">* Your name:</label>
                                    <input type="text" 
                                    className="form-control" 
                                    id="name"
                                    placeholder="Enter your name" 
                                    onChange={this.updateState}
                                    required
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="form-group">
                                    <label htmlFor="email" id="estimateFormLabel">* Your email:</label>
                                    <input id="email" onChange={this.updateState} type="email" 
                                    className="form-control" id="email" 
                                    placeholder="Enter your email" 
                                    required
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="form-group">
                                    <label  htmlFor="projectType" id="estimateFormLabel">* Project type:</label>
                                        <select id="projectType" onChange={this.updateState} required>
                                            <option disabled selected>Select a Project Type</option>
                                            <option value="New Construction">New Construction</option>
                                            <option value="Bathroom Remodel">Bathroom Remodel</option>
                                            <option value="Kitchen Remodel">Kitchen Remodel</option>
                                            <option value="Garage Conversion">Garage Conversion</option>
                                            <option value="Other">Other</option>
                                        </select>
                                </div>
                            </Col>
                        </Row>
                        </Col>
                        <Col>
                                <div id="estimateFormLabel" className="form-group">
                                    <label id="reviewlabel" htmlFor="body">Further Details:</label>
                                    <textarea onChange={this.updateState} className="form-control" id="description" rows="10"></textarea>
                                </div>
                        </Col>
                    </Row>
                    </Col>
                    <Col id="submitRow">
                        <button id="submitEstimateButton" type="submit">Send Estimate Request</button>
                    </Col>
                </form>
            </div>
        )
    }
}

export default EstimateCreator