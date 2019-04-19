import React from 'react'
import styles from './ContactPage.css'

import EstimateCreator from '../../components/EstimateCreator/EstimateCreator'

class ContactPage extends React.PureComponent{
    constructor(){
        super()

        this.state = {}
    }

    render(){
        return(
            <div>

            <EstimateCreator/>



                <div class="mapouter">
                    <div class="gmap_canvas">
                    <iframe width="370" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=LU%20Construction&t=&z=15&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
                    </iframe>
                    <a href="https://www.emojilib.com">emojilib.com</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default ContactPage