
import React from 'react'
import styles from'./ProjectsPage.css'
import { Route, Link } from "react-router-dom";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faTools } from '@fortawesome/free-solid-svg-icons'
import ProjectPreview from '../../components/ProjectPreview/ProjectPreview'
import Project from '../../components/Project/Project'
import Spinner from '../../components/Spinner/Spinner'
const superagent = require('superagent');


class ProjectsPage extends React.PureComponent{
    constructor(props){
        super(props)

        this.state={
            loading: true
        }
    }

    componentDidMount(){
        this.fetchProjects()
    }

    redirectToProject(id){
        this.props.history.push(`${this.props.match.path}/${id}`)
    }

    fetchProjects(){
        superagent
            .get(process.env.REACT_APP_SUBMIT_PROJECT_URL + '/all')
            .then(res => {
                if (res){
                    this.setState({
                        projects: res.body
                    }, this.setState({loading: false}))
                }
            })
    }

    renderProjects(){
        return this.state.projects.map(project => {
            return <ProjectPreview project={project} colSize={4}/>
        })
    }

    getSidebarProjectList(){
        return this.state.projects.map(project => {
            return(
                <p id="projectSidebarItem" onClick={() => this.redirectToProject(project.projectId)}>{project.projectName}</p>
            )
        })
    }

    render(){
        return(
            this.state.projects
            ? <Row>
                <Col className="d-none d-lg-block" id="projectsListPanel" lg={2}>
                    <Link to="/projects" id="projectsPageLink">
                        <span id="projectListPanelTitle">
                            Projects
                        </span>
                    </Link>
                    <div id="projectsListItems">{this.getSidebarProjectList()}</div>
                </Col> 
                <Route path={`${this.props.match.path}/:projectId`} component={Project}/>
                <Route
                    exact
                    path={this.props.match.path}
                    render={() => 
                        <Col id="projectsTilesPanel">
                            <h2 id="projectsTitle">We have {this.state.projects.length} projects to show you</h2>
                            <Row>
                            {this.renderProjects()}
                            </Row>
                        </Col>
                    }
                />
            </Row>
            :
            <Spinner/>
        )
    }
}

export default ProjectsPage