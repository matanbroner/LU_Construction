import React, {useState} from 'react'
import styles from './PhotoPreviewContainer.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { faChevronCircleDown, faChevronCircleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const uuid = require('uuid')

const PhotoPreviewContainer = (props) => {

    const [open, openPhotos] = useState(false);
    const [refresh, refreshPhotos] = useState(props.project.coverImage)

    const getPhotos = () => {
        return props.photos.map(photo => 
            {
                return(
                    <Col key={uuid()} xs={12} lg={3} id="imageWrapper">
                        <img alt="project-cover" id={photo.key} className={`${photo.url === props.project.coverImage ? 'coverImage' : null}`} src={photo.url}/>   
                        <div id="dropdownWrapper">
                            <DropdownButton 
                            id="dropdown-basic-button" 
                            title="Photo Actions"
                            drop="down"
                            size="sm"
                            variant="warning"
                            >
                            <Dropdown.Item onClick={() => props.deletePhoto(photo.key)} href="#">Delete Photo</Dropdown.Item>
                            <Dropdown.Item onClick={() => {
                                props.makeCover(photo.key)
                                refreshPhotos(props.project.coverImage)
                            }} href="#">Make Project Cover Photo</Dropdown.Item>
                            </DropdownButton>    
                        </div>  
                    </Col>
                )
            }
        )
    }

    return(
        <div>
            <Row id="controlWrapper">
                <Col xs={12}>
                    <div id="photoTrigger" className={props.photos.length >= 1 ? null : 'disabled'} onClick={() => openPhotos(!open)}>
                    {open ? 'Hide' : 'Show'} Uploaded Photos
                    <FontAwesomeIcon icon={open ? faChevronCircleUp : faChevronCircleDown}/>
                    </div>
                </Col>
            </Row>
            <Container id="containerWrapper">
                <Row>
                    {open ? getPhotos() : null}
                </Row>
            </Container>
        </div>
    )
}

export default PhotoPreviewContainer