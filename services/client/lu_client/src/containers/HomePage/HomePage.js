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

let review = "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

class HomePage extends React.PureComponent{
    constructor(props){
        super(props)

        this.state={

        }
    }

    render(){
        let projects = []
        for (let i = 0; i<10; i++)
        {
            projects.push(<ProjectPreview location="San Jose" image="https://st.hzcdn.com/fimgs/ae91b2e70b31636c_3374-w500-h400-b0-p0--home-design.jpg" colSize={6}/>)
        }
        return(
            <div>
                
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

                <Row>
                <Col className="projectsPreview" lg={8} md={8}>
                    <Container>
                        <h3 id="projectsPreviewHeader">Our work may impress you...</h3>
                        <MediaQuery query="(min-width: 900px)">
                            <Row>
                                {projects}
                            </Row>
                        </MediaQuery>
                        <MediaQuery query="(max-width: 901px)">
                            <ScrollableSection>
                                {projects}
                            </ScrollableSection>
                        </MediaQuery>
                    </Container>
                </Col>
                <Col className="testimonialsPreview" lg={4} md={4}>
                    <Container>
                        <h3 id="testimonialsPreviewHeader">What people are saying</h3>
                        <TestimonialPreview rating={4} name="Matan Broner" review={review}/>
                        <TestimonialPreview rating={4} name="Matan Broner" review={review}/>
                        <TestimonialPreview rating={4} name="Matan Broner" review={review}/>
                        <TestimonialPreview rating={4} name="Matan Broner" review={review}/>
                    </Container>
                </Col>
                </Row>
            </div>
            
        )
    }
}

export default HomePage