import React from 'react'
import styles from './Toggle.css'
import ProjectsPage from '../../containers/ProjectsPage/ProjectsPage';

class Toggle extends React.Component {
    state = {
      toggle: false
    }

    componentDidMount(){
        if (this.props.value)
            this.setState({toggle: true})
    }
  
    toggle () {
      this.setState({ toggle: !this.state.toggle }, this.props.toggleEffect(!this.state.toggle))
    }
  
    render () {
      const className = `toggle-component ${ this.state.toggle ? ' active' : ''}`
      return (
          <div id="toggleWrap">
              <h6>{this.props.title}</h6>
                <div
                className={className}
                onClick={() => this.toggle()}>
                <div className='toggle-button' />
                </div>
         </div>
      )
    }
  }

  export default Toggle