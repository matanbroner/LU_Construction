
import React from 'react'
import styles from './Project.css'
import "react-image-gallery/styles/css/image-gallery.css"

import ImageGallery from 'react-image-gallery';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import SkyLight from 'react-skylight';
import MediaQuery from 'react-responsive'
import Spinner from '../Spinner/Spinner';
const superagent = require('superagent');


const images = [
    {
      original: 'https://st.hzcdn.com/simgs/faa1fe4d0b316391_9-3411/--spaces.jpg',
      thumbnail: 'https://st.hzcdn.com/simgs/faa1fe4d0b316391_9-3411/--spaces.jpg',
    },
    {
      original: 'https://st.hzcdn.com/simgs/faa1fe4d0b316391_9-3411/--spaces.jpg',
      thumbnail: 'https://st.hzcdn.com/simgs/faa1fe4d0b316391_9-3411/--spaces.jpg'
    },
    {
      original: 'https://st.hzcdn.com/simgs/1f71e1660b316356_9-1750/--spaces.jpg',
      thumbnail: 'https://st.hzcdn.com/simgs/1f71e1660b316356_9-1750/--spaces.jpg'
    },
    {
        original: 'https://st.hzcdn.com/simgs/0ea107b20b3162ea_9-3252/--spaces.jpg',
        thumbnail: 'https://st.hzcdn.com/simgs/0ea107b20b3162ea_9-3252/--spaces.jpg',
      },
      {
        original: 'https://www.youtube.com/embed/6pxRHBw-k8M',
        thumbnail: 'https://www.youtube.com/embed/6pxRHBw-k8M'
      },
      {
        original: 'http://lorempixel.com/250/250/nature/3/',
        thumbnail: 'http://lorempixel.com/250/150/nature/3/'
      },
      {
        original: 'https://st.hzcdn.com/fimgs/ae91b2e70b31636c_3374-w500-h400-b0-p0--home-design.jpg',
        thumbnail: 'https://st.hzcdn.com/fimgs/ae91b2e70b31636c_3374-w500-h400-b0-p0--home-design.jpg',
      },
      {
        original: 'http://lorempixel.com/250/250/nature/2/',
        thumbnail: 'http://lorempixel.com/250/250/nature/2/'
      },
      {
        original: 'http://lorempixel.com/250/250/nature/3/',
        thumbnail: 'http://lorempixel.com/250/150/nature/3/'
      },
      {
        original: 'https://st.hzcdn.com/fimgs/ae91b2e70b31636c_3374-w500-h400-b0-p0--home-design.jpg',
        thumbnail: 'https://st.hzcdn.com/fimgs/ae91b2e70b31636c_3374-w500-h400-b0-p0--home-design.jpg',
      },
      {
        original: 'http://lorempixel.com/250/250/nature/2/',
        thumbnail: 'http://lorempixel.com/250/250/nature/2/'
      },
      {
        original: 'http://lorempixel.com/250/250/nature/3/',
        thumbnail: 'http://lorempixel.com/250/150/nature/3/'
      }
  ]

let lorem1 = "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

var projectDetailsModalStyles={
    width: '70%',
    marginLeft: '-35%',
    maxHeight: '60%',
    overflow: 'auto',
    marginTop: '-20vh',
    minHeight: '200px'
}


class Project extends React.PureComponent{
    constructor(props){
        super(props)

        this.state={
            loading: true
        }
    }

    componentDidMount(){
      this.fetchProject()
    }

    fetchProject(){
      superagent
          .get(process.env.REACT_APP_SUBMIT_PROJECT_URL + '/' + this.props.match.params.projectId)
          .then(res => {
              if (res){
                  this.setState({
                      project: res.body
                  }, this.fetchProjectPhotos())
              }
          })
  }

  fetchProjectPhotos(){
    superagent
        .get(process.env.REACT_APP_SUBMIT_PROJECT_URL + '/api/photos/get/' + this.props.match.params.projectId)
        .then(res => {
            this.setState({photos: res.body, loading: false})
        })
    }

    getPhotoUrls(){
      let urls = this.state.photos.forEach(photo => photo.url)
      return urls
    }


    render()
      {
        console.log(this.props.match.params)
          return (
            this.state.loading 
            ? <Spinner/>
            : <Col id="projectContentWrapper">
                <Row id="galleryRow">
                    <Col md={9} id="galleryAndHeader">
                        <div id="projectDetailsWrapper">
                            <span id="projectTitle">{this.state.project.projectName}</span>
                            <p id="projectDescription">{lorem1}</p>
                        </div>
                        <div id="gallery"><ImageGallery items={this.getPhotoUrls()} thumbnailPosition="right"/></div>
                    </Col>
                    <Col md={2} id="projectParamsWrapper" className="d-none d-lg-block">
                        <h5 id="detailsHeader">Project Details</h5>
                        <p><h6>Project Year:</h6>2018</p>
                        <p><h6>Project Cost:</h6>$750,001 - $1,000,000</p>
                        <p><h6>Project Type:</h6>New Construction</p>
                        <p><h6>Project Location:</h6>San Jose, CA</p>
                        <div id="getAnEstimatePrompt">
                            <p>Like this project? Tell us what your dream house looks like!</p>
                            <button>Get an estimate!</button>
                        </div>
                    </Col>
                </Row>
                <MediaQuery query={"(max-width: 901px)"}>
                <button onClick={() => this.simpleDialog.show()}>Open Modal</button>
                <SkyLight dialogStyles={projectDetailsModalStyles} hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Project Details">
                    <p><h6>Project Year:</h6>2018</p>
                    <p><h6>Project Cost:</h6>$750,001 - $1,000,000</p>
                    <p><h6>Project Type:</h6>New Construction</p>
                    <p><h6>Project Location:</h6>San Jose, CA</p>
                    <div id="getAnEstimatePrompt">
                        <p>Like this project? Tell us what your dream house looks like!</p>
                        <button>Get an estimate!</button>
                    </div>
                </SkyLight>
                </MediaQuery>
          </Col>
      )
    }
}

export default Project