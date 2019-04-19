import React from 'react'
import styles from './EstimateCreator.css'
const sendmail = require('sendmail')();
 

class EstimateCreator extends React.Component{
    constructor(){
        super()

        this.state = {

        }

    }

    componentDidMount(){
        this.sendEstimate()
    }

    sendEstimate(){
        sendmail({
            from: 'johnny-bamba@gmail.com',
            to: 'matanbroner@gmail.com',
            subject: 'test sendmail',
            html: 'Mail of test sendmail ',
          }, function(err, reply) {
            console.log(err && err.stack);
            console.dir(reply);
        });
    }

    render(){
        return(
            <div>EstimateCreator</div>
        )
    }
}

export default EstimateCreator