
import React from 'react'
import styles from './Project.css'
import "react-image-gallery/styles/css/image-gallery.css"
import TabbedText from '../TabbedText/TabbedText'
import ImageGallery from 'react-image-gallery';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import SkyLight from 'react-skylight';
import MediaQuery from 'react-responsive'
import Spinner from '../Spinner/Spinner';
import ScrollableSection from '../ScrollableSection/ScrollableSection'
import {Link} from 'react-router-dom'
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

    renderProjectDetails(){
        return(
            <div>
                <p><h6>Project Date:</h6>{formatDate(this.state.project.createDate)}</p>
                    <p><h6>Project Cost:</h6>${this.state.project.priceMin.toLocaleString()} - ${this.state.project.priceMax.toLocaleString()}</p>
                    <p><h6>Project Location:</h6>{this.state.project.projectLocation}</p>
                    <div id="getAnEstimatePrompt">
                    <p>Like this project? Tell us what your dream house looks like!</p>
                    <button><Link to="/contact">Get an estimate!</Link></button>
                </div>
            </div>
        )
    }

    renderMobilePhotos(){
        let urls = this.getPhotoUrls()
        let images = urls.map(url => {
            return (
                    <img id="mobilePhotoWrapper" src={url.original}/>
            )
        })
        return(
            <div id="mobilePhotosScrollWrapper">
                <MediaQuery orientation="portrait">
                    <ScrollableSection height="100vh">
                        {images}
                    </ScrollableSection>
                </MediaQuery>
                <MediaQuery orientation="landscape">
                    <ScrollableSection horizontal height="80vh" width="85vw">
                        {images}
                    </ScrollableSection>
                </MediaQuery>
            </div>
        )
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
                            <MediaQuery query="(max-device-width: 1224px)">
                                <TabbedText width="85vw" itemName="Project Description" content={this.state.project.projectDescription}>
                                    <div id="detailsButtonWrapper">
                                        <button id="projectDetailsButton" onClick={() => this.simpleDialog.show()}>View More Details</button>
                                    </div>
                                </TabbedText>
                                {this.renderMobilePhotos()}
                            </MediaQuery>
                            <MediaQuery query="(min-device-width: 1225px)">
                                <p id="projectDescription">{this.state.project.projectDescription}</p>
                                <div id="gallery"><ImageGallery items={this.getPhotoUrls()} thumbnailPosition="right"/></div>
                            </MediaQuery>
                        </div>
                    </Col>
                    <Col md={2} id="projectParamsWrapper" className="d-none d-lg-block">
                        <h5 id="detailsHeader">Project Details</h5>
                        {this.renderProjectDetails()}
                    </Col>
                </Row>
                <MediaQuery query={"(max-width: 901px)"}>
                <SkyLight dialogStyles={projectDetailsModalStyles} hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Project Details">
                    {this.renderProjectDetails()}
                </SkyLight>
                </MediaQuery>
          </Col>
      )
    }
}

export default Project