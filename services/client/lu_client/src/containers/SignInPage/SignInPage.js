import React from 'react'
import styles from './SignInPage.css'
import Spinner from '../../components/Spinner/Spinner'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faHome, faLock } from '@fortawesome/free-solid-svg-icons'
import { authenticate } from '../../assets/utils/authenticate'

const superagent = require('superagent');


class SignInPage extends React.PureComponent{
    constructor(props){
        super(props)

        this.state={
            username: '',
            password: '',
            valid: true,
            loading: false
        }

        this.updateState = this.updateState.bind(this)
        this.verifyCreds = this.verifyCreds.bind(this)
    }

    componentDidMount(){
        authenticate(r => this.redirectIfAuthenticated(r))
    }

    redirectIfAuthenticated(response){
        if (response){
            this.props.history.replace('/user_dash')
        }
    }
    updateState(e){
        let attribute = e.target.id
        let value = e.target.value
        this.setState({[attribute]: value})
    }

    verifyCreds(e){
        e.preventDefault()
        this.setState({loading: true})
        let user = {
            username: this.state.username,
            password: this.state.password
        }
        superagent
            .post('/service/users/api/login')
            .send(user)
            .set('accept', 'json')
            .end((err, res) => {
                if(err){
                    this.setState({
                        loading: false,
                        valid: false
                    })
                }
                else{
                    this.setState({loading: false})
                    const token = res.body.token
                    const name = res.body.name
                    localStorage.setItem("jwtToken", token);
                    localStorage.setItem("name", name);
                    this.redirectIfAuthenticated(true)
                    }
                }
            );
    }

    render(){
        return(
            this.state.loading 
            ? <Spinner/>
            : <div id="signInPageWrapper">
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
                                <form onSubmit={this.verifyCreds}>
                                    <div className="form-group">
                                        
                                        <input onChange={this.updateState} type="username" className="form-control cred" id="username" placeholder="Enter username" required/>
                                    </div>
                                    <div className="form-group">
                                        
                                        <input onChange={this.updateState}  type="password" className="form-control cred" id="password" placeholder="Password" required/>
                                    </div>
                                    <button type="submit" id="submitcreds" className="btn btn-primary">Submit</button>	
                                    { this.state.valid ? null : <p id="errorLogin">Invalid login, please try again.</p>}
                                </form>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    
                </Container>
            </div>
        )
    }
}

export default SignInPage