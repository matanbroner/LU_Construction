import React from 'react'
import styles from './SignInPage.css'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faHome, faUser, faKey, faLock } from '@fortawesome/free-solid-svg-icons'


class SignInPage extends React.PureComponent{
    constructor(props){
        super(props)

        this.state={
            username: '',
            password: ''
        }

        this.updateState = this.updateState.bind(this)
        this.authenticate = this.authenticate.bind(this)
    }

    updateState(e){
        let attribute = e.target.id
        let value = e.target.value
        this.setState({[attribute]: value})
    }

    authenticate(e){
        e.preventDefault()
        console.log("Authenticating")
    }

    render(){
        return(
            <Container className="mainContent">  
                <Row className="row row justify-content-start">
                    <Col xs={12} md={3} className="loginExplained">
                        <h6 id="loginExplainedTitle">What is this page?</h6>

                            <p id="loginExplainedPrompt">
                            This page is meant for LU Contruction employees only. 
                            We do not currently offer accounts for customers on our website.
                            If you are as LU Contruction employee, please enter your credentials.
                            <br/>
                           <Link to="/">
                           <button id="homeButton">
                                <FontAwesomeIcon icon={faHome}/>
                                Home
                            </button>
                           </Link>
                            </p>
                    </Col>
                    <Col xs={12} md={9} className="loginMain">
                        <h3 id="loginTitle">Sign In <FontAwesomeIcon id="titleIcon" icon={faLock}/></h3>
                        <Row className="row row justify-content-center">
                            <Col md={5} id="loginCreds">
                            <form role="form" onSubmit={this.authenticate}>
                                <div className="form-group">
                                    
                                    <input onChange={this.updateState} type="username" className="form-control" id="username" placeholder="Enter username" required/>
                                </div>
                                <div className="form-group">
                                    
                                    <input onChange={this.updateState}  type="password" className="form-control" id="password" placeholder="Password" required/>
                                </div>
                                <button type="submit" id="submit" className="btn btn-primary">Submit</button>	

                            </form>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                
            </Container>
        )
    }
}

export default SignInPage