
import React from 'react'
import styles from './UserDashboard.css'
import { Route, Link } from "react-router-dom";
import ManageProjects from '../ManageProjects/ManageProjects'
import ManageTestimonials from '../ManageTestimonials/ManageTestimonials'
import ManageUsers from '../ManangeUsers/ManageUsers'
import Spinner from '../../components/Spinner/Spinner'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import UserDashAction from '../../components/UserDashAction/UserDashAction'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'
import { faHardHat, faStar, faHome, faUser, faChartLine, faTh } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { authenticate } from '../../assets/utils/authenticate'
import { logout } from '../../assets/utils/logout'


class UserDashboard extends React.PureComponent{
    constructor(props){
        super(props)

        this.state = {
            loading: true,
        }
    }

    componentDidMount(){
        const authenticated = authenticate(r => this.redirectIfNotAuthenticated(r))
    }

    redirectIfNotAuthenticated(response){
        if (!response){
            this.props.history.replace('/sign_in')
        }
        else{
            console.log(response.user)
            this.setState({
                name: response.user.name,
                role: response.user.role,
                loading: false
            })
        }
    }

    logoutAnRedirect(){
        logout()
        this.props.history.push("/sign_in")
    }

    render(){
        return(
            this.state.loading 
            ? <Spinner/>
            : <div id="userDashWrapper">
                <Row>
                    <Col className="d-none d-lg-block" lg={2} id="userDashSidebar">
                        <div id="userProfile">
                            <Link to='/user_dash'>
                                <FontAwesomeIcon id="userDashIcon" icon={faUserCircle}/>
                            </Link>
                            <p id="userDashName">{this.state.name}</p>
                            <p id="userDashRole">{this.state.role}</p>
                            <button id="logoutButton" onClick={() => this.logoutAnRedirect()}>Log Out</button>
                        </div>
                    </Col>
                    <Route path={`${this.props.match.path}/manage_projects`} component={ManageProjects}/>
                    <Route path={`${this.props.match.path}/manage_testimonials`} component={ManageTestimonials}/>
                    <Route path={`${this.props.match.path}/manage_users`} component={ManageUsers}/>
                    <Route
                    exact
                    path={this.props.match.path}
                    render={() => 
                            <Col lg={10} xs={12} id="dashboardContentWrapper">
                            <Row id="greetingRow">
                                <Col xs={4} id="greetUser">
                                    <h1>Hello, {this.state.name}</h1>
                                </Col>
                            </Row>
                            <Row id="actionsRow">
                                <UserDashAction 
                                icon={faStar} 
                                background="#f7d600" 
                                action="Manage Testimonials"
                                redirect={`${this.props.match.path}/manage_testimonials`}
                                />
                                <UserDashAction 
                                icon={faHardHat} 
                                background="#00ae00" 
                                action="Manage Projects"
                                redirect={`${this.props.match.path}/manage_projects`}
                                />
                                <UserDashAction icon={faHome} background="#f96a86" action="Manage Homepage"/>
                            </Row>
                            <Row id="tasksAndTrackingRow">
                                <UserDashAction icon={faChartLine} background="#a156f0" action="Site Analytics"/>
                                {this.state.role === 'Administrator' 
                                    ? <UserDashAction 
                                        icon={faUser} 
                                        background="#009bee" 
                                        redirect={`${this.props.match.path}/manage_users`}
                                        action="Manage Users"/>
                                    : <Col className="d-none d-lg-block" lg={4}/>
                                }
                            </Row>
                        </Col>
                    }
                    />
                </Row>
            </div>
        )
    }
}

export default UserDashboard