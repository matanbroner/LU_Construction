import React from 'react'
import styles from './FileProgressBar.css'
import ProgressBar from 'react-bootstrap/ProgressBar'

const FileProgressBar = (props) => {
    return (
        <div id="progressBarWrapper">
            <ProgressBar animated now={props.percent}/>
            <h6>File Upload Complete: {Math.round(props.percent)}%</h6>
        </div>
    )
}

export default FileProgressBar