import React, {useState} from 'react'
import styles from './TabbedText.css'

const TabbedText = (props) => {

    const [show, toggleShow] = useState(false);

    const styles = {
        width: props.width || 'auto'
    }

    return(
        <div id="tabbedTextWrapper" style={styles}>
            <div id="headerTab" onClick={() => toggleShow(!show)}>
                <p id="headerTitle">
                    {show ? 'Hide ' : 'Show '}
                    {props.itemName}
                </p>
            </div>
            <div id="mainContent">
                {
                    show 
                    ?   
                        <div>
                            <p id="mainContentText">
                                {props.content}
                            </p>
                            {props.children || null}
                        </div>
                    : null
                }
            </div>
        </div>
    )
}

export default TabbedText