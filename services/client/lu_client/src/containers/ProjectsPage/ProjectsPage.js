
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


class ProjectsPage extends React.PureComponent{
    constructor(props){
        super(props)

        this.state={
            loading: false
        }
    }

    render(){
        let projects = []
        for (let i = 0; i<20; i++)
        {
            projects.push(<ProjectPreview location="San Jose" image="https://st.hzcdn.com/fimgs/ae91b2e70b31636c_3374-w500-h400-b0-p0--home-design.jpg" colSize={4}/>)
        }
        let projectNames = []
        for (let i = 0; i<10; i++)
        {
            projectNames.push(<p>This is a project name</p>)
        }
        return(
            !this.state.loading ?
            <Row>
                <Col className="d-none d-lg-block" id="projectsListPanel" lg={2}>
                    <Link to="/projects" id="projectsPageLink">
                        <span id="projectListPanelTitle">
                        <FontAwesomeIcon icon={faTools} id="projectListPanelIcon"/>
                            Projects
                        </span>
                    </Link>
                    <div id="projectsListItems">{projectNames}</div>
                </Col> 
                <Route path={`${this.props.match.path}/:projectId`} component={Project}/>
                <Route
                    exact
                    path={this.props.match.path}
                    render={() => 
                        <Col id="projectsTilesPanel">
                            <h2 id="projectsTitle">We have 49 projects to show you</h2>
                            <Row>
                            {projects}
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