import React from 'react'
import styles from './Spinner.css'


const Spinner = (props) => {

    return(
        <div id="spinnerWrapper" style={props.wrapperStyles}>
            <div className="spinner"></div>
        </div>
    )
}

export default Spinner