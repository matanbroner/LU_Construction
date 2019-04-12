import React from 'react'
import styles from './ScrollableSection.css'

const ScrollableSection = (props) => {

    return(
        <div className="scrolling-wrapper-flexbox">
            {props.children}
        </div>
    )
}

export default ScrollableSection