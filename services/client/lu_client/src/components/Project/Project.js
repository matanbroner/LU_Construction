
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
import {formatDate} from '../../assets/utils/stringFormat'
const superagent = require('superagent');


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
      this.fetchProject(this.props.match.params.projectId)
    }

    componentWillReceiveProps(newProps){
      if (newProps.match.params.projectId !== this.props.match.params.projectId)
      {
        this.setState({loading: true}, this.fetchProject(newProps.match.params.projectId))
      }
    }

    fetchProject(id){
      superagent
          .get(process.env.REACT_APP_SUBMIT_PROJECT_URL + '/api/' + id)
          .then(res => {
              if (res){
                  this.setState({
                      project: res.body
                  }, this.fetchProjectPhotos(id))
              }
          })
  }

  fetchProjectPhotos(id){
    superagent
        .get(process.env.REACT_APP_SUBMIT_PROJECT_URL + '/api/photos/get/' + id)
        .then(res => {
            this.setState({photos: res.body, loading: false})
        })
    }

    getPhotoUrls(){
      let urls = this.state.photos.filter(photo => photo.url !== this.state.project.coverImage)
      .map(photo => {
        return {
            original: photo.url,
            thumbnail: photo.url
        }
      })
      if(this.state.project.coverImage){
        urls.unshift({
            original: this.state.project.coverImage,
            thumbnail: this.state.project.coverImage
        })
      }
      return urls
    }


    render()
      {
          return (
            this.state.loading 
            ? <Spinner/>
            : <Col id="projectContentWrapper">
                <Row id="galleryRow">
                    <Col md={9} id="galleryAndHeader">
                        <div id="projectDetailsWrapper">
                            <span id="projectTitle">{this.state.project.projectName}</span>
                            <p id="projectDescription">{this.state.project.projectDescription}</p>
                        </div>
                        <div id="gallery"><ImageGallery items={this.getPhotoUrls()} thumbnailPosition="right"/></div>
                    </Col>
                    <Col md={2} id="projectParamsWrapper" className="d-none d-lg-block">
                        <h5 id="detailsHeader">Project Details</h5>
                        <p><h6>Project Date:</h6>{formatDate(this.state.project.createDate)}</p>
                        <p><h6>Project Cost:</h6>${this.state.project.priceMin.toLocaleString()} - ${this.state.project.priceMax.toLocaleString()}</p>
                        <p><h6>Project Type:</h6>New Construction</p>
                        <p><h6>Project Location:</h6>{this.state.project.projectLocation}</p>
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