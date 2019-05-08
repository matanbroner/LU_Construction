import React from 'react'
import styles from './ScrollableSection.css'


const ScrollableSection = (props) => {

    const styles = {
        display: `${props.horizontal ? 'flex' : null}`,
        height: props.height || 'auto',
        width: props.width || 'auto'
    }

    return(
        <div className="scrolling-wrapper-flexbox" style={styles}>
            {props.children}
        </div>
    )
}

export default ScrollableSection