import React from 'react'
import Container from 'react-bootstrap/Container'
import styles from './HomePage.css'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import MediaQuery from 'react-responsive';

import TestimonialPreview from '../../components/TestimonialPreview/TestimonialPreview'
import Spinner from '../../components/Spinner/Spinner'
import ProjectPreview from '../../components/ProjectPreview/ProjectPreview'
import ScrollableSection from '../../components/ScrollableSection/ScrollableSection'
import TestimonialItem from '../../components/TestimonialItem/TestimonialItem'
const superagent = require('superagent')
const uuid = require('uuid')

let review = "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

class HomePage extends React.PureComponent{
    constructor(props){
        super(props)

        this.state={
            loading: true
        }
    }

    componentWillMount(){
        this.fetchProjects()
    }

    fetchProjects(){
        superagent
            .get(process.env.REACT_APP_SUBMIT_PROJECT_URL + '/featured')
            .then(res => {
                if (res){
                    this.setState({
                        projects: res.body
                    }, this.fetchTestimonials())
                }
            })
    }

    fetchTestimonials(){
        superagent
        .get('/service/testimonials/all')
        .then(res => this.setState({testimonials: res.body}, this.setState({loading: false})))
    }

    renderFeaturedProjects(){
        if(this.state.projects)
            return this.state.projects.map(project => {
                return <ProjectPreview 
                        key={uuid()}
                        location="San Jose" 
                        project={project}
                        colSize={6}/>
            })
    }

    renderTestimonials(){
        if(this.state.testimonials)
            return this.state.testimonials.map(testimonial => {
                return <TestimonialPreview key={uuid()} item={testimonial}/>
            })
    }

    render(){
        return(
            this.state.loading
            ? <Spinner/>
            : <div>
                <div className="bannerimage">
                    <Jumbotron fluid>
                        <Container>
                            <h1 id="jumbotronTitle">THE LU ADVANTAGE</h1>
                            <p id="jumbotronText">
                            We are a licensed, accredited business with BBB (Better Business Bureau), and experienced in-house construction and home remodeling company, and we don't stop there, because we can build a house from the ground up. 
                            </p>
                        </Container>
                    </Jumbotron>
                </div>

                <Row id="contentRow">
                <Col className="projectsPreview" lg={8} md={8}>
                    <Container>
                        <h3 id="projectsPreviewHeader">Our work may impress you...</h3>
                        <MediaQuery query="(min-width: 900px)">
                            <Row>
                                {this.renderFeaturedProjects()}
                            </Row>
                        </MediaQuery>
                        <MediaQuery query="(max-width: 901px)">
                            <ScrollableSection horizontal>
                                {this.renderFeaturedProjects()}
                            </ScrollableSection>
                        </MediaQuery>
                    </Container>
                </Col>
                <Col className="testimonialsPreview" lg={4} md={4}>
                    <Container id="testimonialsPreviewContent">
                        <h3 id="testimonialsPreviewHeader">What people are saying</h3>
                        {this.renderTestimonials()}
                    </Container>
                </Col>
                </Row>
            </div>
            
        )
    }
}

export default HomePage