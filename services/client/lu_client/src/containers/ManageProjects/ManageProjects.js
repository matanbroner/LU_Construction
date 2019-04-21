
import React from 'react'
import styles from './ManageProjects.css'
import Spinner from '../../components/Spinner/Spinner'
import ProjectPreview from '../../components/ProjectPreview/ProjectPreview'
import ListModule from '../../components/ListModule/ListModule'
import FileProgressBar from '../../components/FileProgressBar/FileProgressBar'
import PhotoPreviewContainer from '../../components/PhotoPreviewContainer/PhotoPreviewContainer'
import Toggle from '../../components/Toggle/Toggle'
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SkyLight from 'react-skylight';
import { faPlusCircle, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDateProper } from '../../assets/utils/stringFormat'
const uuid = require('uuid')
const superagent = require('superagent');
require('dotenv').config()


var projectInterfaceStyles = {
    width: '60%',
    height: '600px',
    marginTop: '-280px',
    marginLeft: '-30%',
    overflow: 'auto',
    borderRadius: '10px',
    padding: '2vh 4vw'
  }; 


class ManageProjects extends React.PureComponent{
    constructor(props){
        super(props)

        this.state={
            loading: true,
            isNewProject: false,
            fileUpload: {
                uploading: false,
                totalFiles: 0,
                numberComplete: 0
            },
            raw_projects: [],
            editingId: 0,
            project: {},
            photos: [],
            deletedPhotos: []
        }

        this.editProject = this.editProject.bind(this)
        this.modifyProjectState = this.modifyProjectState.bind(this)
        this.setChildRef = this.setChildRef.bind(this);
        this.submitProject = this.submitProject.bind(this)
        this.deleteProject = this.deleteProject.bind(this)
    }

    componentDidMount(){
        this.fetchProjects()
    }

    fetchProjects(){
        superagent
            .get(process.env.REACT_APP_SUBMIT_PROJECT_URL + '/all')
            .then(res => {
                if (res){
                    this.setState({
                        raw_projects: res.body
                    }, this.setState({loading: false}))
                }
            })
    }

    createProjects(){
        let projects = []
        this.state.raw_projects.map(project => {
            projects.push(
                <Col xs={12} lg={4} id="editableProject" >
                <ProjectPreview 
                    project={project}
                    colSize={12}/>
                    <div id="editButtonWrapper">
                        <button id={project.projectId} className="editButton" onClick={this.editProject}>
                            <FontAwesomeIcon icon={faPencilAlt}/>
                            Edit Project
                        </button>
                    </div>
                </Col>
                )
        })
        return projects
    }

    createProject(){
        let newId = uuid()
        let project = { projectName: "New Project", projectId: newId, featured: false}
        this.setState({ 
            isNewProject: true, 
            editingId: newId, 
            project: project, 
            photos: [] }, this.customDialog.show())
    }

    editProject(e){
        let project = Object.assign({}, this.state.raw_projects.find(p => p.projectId === e.target.id))
        this.setState({
            isNewProject: false,
            project: project,
            editingId: project.projectId,
            loading: true
        },
            this.fetchProjectPhotos(project.projectId)
            )
    }

    modifyProjectState(e){
        let project = this.state.project
        project[e.target.id] = e.target.value
        this.setState({project})
    }

    manageVideoLinks(items){
        let project = this.state.project
        project.youtubeLinks = items
        this.setState({ project })
    }

    submitProject(e){
        e.preventDefault()
        this.deletePhotosPermanently()
        superagent
            .post(process.env.REACT_APP_SUBMIT_PROJECT_URL + '/api/modify/' + this.state.editingId)
            .set({'Authorization': localStorage.jwtToken})
            .send({ projectInfo: this.state.project })
            .then(this.childNode.handleSubmit())
            .then(setTimeout(() => {
                this.fetchProjects()
            }, 1500)) // needed to make data load after data is in db
    }

    fetchProjectPhotos(id){
        superagent
            .get(process.env.REACT_APP_SUBMIT_PROJECT_URL + '/api/photos/get/' + id)
            .then(res => {
                this.setState({photos: res.body, loading: false}, () => this.customDialog.show())
            })
    }

    updateUpload(){
        let upload = this.state.fileUpload
        upload.numberComplete++
        if(upload.numberComplete === upload.totalFiles){
            upload = {
                uploading: false,
                totalFiles: 0,
                numberComplete: 0
            }
            this.customDialog.hide()
        }
        this.setState({fileUpload: upload}, () => this.forceUpdate())
    }

    featureProject(bool){
        let project = this.state.project
        project.featured = bool
        this.setState({project})
    }

    deletePhotosPermanently(){
        if(this.state.deletedPhotos.length > 0){
            let keys = this.state.deletedPhotos.map(photo => photo.key)
            superagent
            .post(process.env.REACT_APP_SUBMIT_PROJECT_URL + '/api/photos/delete/' + this.state.editingId)
            .set({'Authorization': localStorage.jwtToken})
            .send({ keys: keys })
            .then(res => {
                this.setState({
                    deletedPhotos:[]
                })
            })
        }
    }

    deleteProject(e){
        this.setState({loading: true}, () => {
            superagent
            .post(process.env.REACT_APP_SUBMIT_PROJECT_URL + '/api/delete/' + this.state.editingId)
            .set({'Authorization': localStorage.jwtToken})
            .then(setTimeout(() => {
                this.fetchProjects()
            }, 1500))
        })
    }

    _onFocus = (e) => {
        e.currentTarget.type = "date";
    }

    _onBlur = (e) => {
        e.currentTarget.type = "text";
        e.currentTarget.placeholder = this.state.isNewProject ? 'Enter a date' : formatDateProper(this.state.project.createDate)
    }

    renderProjectEditor(){
        return(
            <div>
                <form id="editProjectForm" onSubmit={this.submitProject}>
                    <Row>
                        <Col>
                            <div className="form-group">
                            <label for="projectName">Project Create Date:</label>
                            <input 
                            type="text" 
                            id="createDate" 
                            onChange={this.modifyProjectState}  
                            onFocus = {this._onFocus} 
                            onBlur={this._onBlur} 
                            className="form-control"
                            required/>
                            </div>
                        </Col>
                        <Col>
                            <div class="form-group">
                                <label for="projectLocation">Project City Location:</label>
                                <input type="text" 
                                id="projectLocation"
                                className="form-control"
                                onChange={this.modifyProjectState} 
                                placeholder={this.state.project.projectLocation}
                                required
                                />
                            </div>
                        </Col>
                        <Col>
                            <div class="form-group">
                                <label for="priceMin">Project Price Minimum:</label>
                                <div className="input-group-prepend">
                                    <div className="input-group-text">$</div>
                                <input type="number" 
                                step='100'
                                min="0"
                                onChange={this.modifyProjectState} 
                                className="form-control" id="priceMin" 
                                placeholder={this.state.project.priceMin}
                                required
                                />
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div class="form-group">
                                <label for="priceMax">Project Price Minimum:</label>
                                <div className="input-group-prepend">
                                    <div className="input-group-text">$</div>
                                <input type="number" 
                                step='100'
                                min="0"
                                onChange={this.modifyProjectState} 
                                className="form-control" id="priceMax" 
                                placeholder={this.state.project.priceMax}
                                required
                                />
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div class="form-group">
                                <label for="projectDescription">Project Description:</label>
                                <textarea 
                                className="form-control" 
                                id="projectDescription" 
                                rows="5"
                                onChange={this.modifyProjectState} 
                                placeholder={this.state.project.projectDescription}
                                >
                                </textarea>
                            </div>
                        </Col>
                    </Row>
                </form>
                <ListModule 
                    title="YouTube Links" 
                    smallText={<small>Add links to each video and hit the green button.</small>}
                    placeholder="Enter a youtube link here"
                    items={this.state.project.youtubeLinks || []}
                    manageItems={item => this.manageVideoLinks(item)}
                    />
                    <div id="fileUploader">
                    <h6>Photo Upload</h6>
                        <small>
                            Upload photos only! Video uploads will not work here! 
                            <br/>
                            If you have videos to include, please upload them to YouTube and use the above tool.
                        </small>
                        <Dropzone
                            getUploadParams={this.getUploadParams}
                            onChangeStatus={this.handleChangeStatus}
                            onSubmit={this.handleSubmit}
                            accept="image/*"
                            ref={this.setChildRef}
                        />
                    </div>
                    <div>
                        {
                        this.state.photos 
                        ? <PhotoPreviewContainer 
                            photos={this.state.photos}
                            project={this.state.project}
                            deletePhoto={id => this.deletePhoto(id)}
                            makeCover={id => this.makeCover(id)}
                         />
                        : null
                        }
                    </div>
                    <Row>
                        <Col xs={12} id="submitRow">
                            <button type="submit" id="submitProject" form="editProjectForm" onClick={this.submitProject}>Submit Changes</button>
                            {!this.state.isNewProject ? <button className='btn btn-danger' id="deleteProject" onClick={this.deleteProject}>Delete Project</button> : null}
                        </Col>
                    </Row>
                </div>
            )
    }

    renderFileProgressBar(){
        return(
            <FileProgressBar percent={(this.state.fileUpload.numberComplete / this.state.fileUpload.totalFiles) * 100}/>
        )
    }

    renderSkylightTitle(){
        return(
            <div id="skylightTitle">
                <input id="projectName" onChange={this.modifyProjectState} type="text" placeholder={this.state.project.projectName}/>
                {!this.state.fileUpload.uploading ? <Toggle title="Featured on Home Page" toggleEffect={b => this.featureProject(b)} value={this.state.project.featured}/> : null}
            </div>
        )
    }

    /*
        File Uploder Functions
    */

    // specify upload params and url for your files
    getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }
    
    // called every time a file's `status` changes
    handleChangeStatus = ({ meta, file }, status) => { }
    
    // receives array of files that are done uploading when submit button is clicked

    handleSubmit = (files, allFiles) => {
        if(allFiles.length !== 0){
            let upload = this.state.fileUpload
            upload.uploading = true
            upload.totalFiles = allFiles.length
            let project = this.state.project
                if(project.mediaCount)
                    project.mediaCount += allFiles.length
                else project.mediaCount = allFiles.length
            this.setState({fileUpload: upload, project: project}, () => {
                allFiles.map(f => {
                    superagent
                    .post(process.env.REACT_APP_SUBMIT_PROJECT_URL + '/api/photos/add/' + this.state.editingId)
                    .set({'Authorization': localStorage.jwtToken})
                    .attach('upload', f.file)
                    .then(res => this.updateUpload())
                })
                allFiles.forEach(f => f.remove())
            })
            
        }
        else{
            this.customDialog.hide()
        }
    }

    setChildRef(node) { // receives reference to component as argument
        this.childNode = node;
      }

    /*
      Photo Preview Container Functions
    */

    deletePhoto(id){
        let photo = this.state.photos.find(p => p.key === id)
        let project = this.state.project
        let deleted = this.state.deletedPhotos
        deleted.push(photo)
        project.mediaCount -= 1
        let newPhotos = this.state.photos.filter(p => p.key !== id)
        this.setState({photos: newPhotos, deletedPhotos:deleted, project:project})
    }

    makeCover(id){
        this.setState({loading: true})
        let photo = this.state.photos.find(p => p.key === id)
        let project = this.state.project
        project.coverImage = photo.url
        this.setState({ project }, this.setState({loading: false}))
    }

    render(){
        return(
            this.state.loading 
            ?   <Col>
                    <Spinner wrapperStyles={{minWidth: '0%', minHeight: '0%'}}/>
                </Col>
            : <Col>
                <Row id="manageProjectsTitleRow">
                    <Col xs={12} lg={4}>
                        <h2 id="projectsTitle">Currently hosting {this.state.raw_projects.length} projects.</h2>
                    </Col>
                    <Col xs={12} lg={2}>
                    <button id="createProjectButton" onClick={() => this.createProject()}>
                        <FontAwesomeIcon icon={faPlusCircle}/>
                        Create a Project
                    </button>
                    </Col>
                </Row>

                <Row id="allProjectsWrapper">
                    {this.createProjects()}
                </Row>
                <SkyLight 
                dialogStyles={projectInterfaceStyles} 
                ref={ref => this.customDialog = ref} 
                title={this.renderSkylightTitle()}
                >
                {
                this.state.fileUpload.uploading
                ? this.renderFileProgressBar()
                : this.renderProjectEditor()
                }
                </SkyLight>
             </Col>
        )
    }
}

export default ManageProjects