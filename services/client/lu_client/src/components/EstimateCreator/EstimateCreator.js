import React from 'react'
import styles from './EstimateCreator.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
 

class EstimateCreator extends React.Component{
    constructor(){
        super()

        this.state = {

        }

    }

    componentDidMount(){
        this.sendEstimate()
    }

    sendEstimate(){

    }

    render(){
        return(
            <div id="estimateCreatorWrapper">
                <h3>Want an Estimate?</h3>
                <form>
                    <Row>
                        <Col>
                            <Row>
                            <Col>
                                <div class="form-group">
                                    <label for="name">Your name:</label>
                                    <input type="text" 
                                    className="form-control" id="name"
                                    placeholder="Enter your name" 
                                    required
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div class="form-group">
                                    <label for="email">Your email:</label>
                                    <input type="email" 
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
                                    <label id="reviewlabel" for="projectType">Project type:</label>
                                        <select id="projectType" onChange={this.updateState}>
                                            <option selected value="New Construction">New Construction</option>
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
                                <div className="form-group">
                                    <label id="reviewlabel" for="body">Further Details:</label>
                                    <textarea className="form-control" id="description" rows="15"></textarea>
                                </div>
                        </Col>
                    </Row>
                </form>
            </div>
        )
    }
}

export default EstimateCreator