import React from 'react'
import styles from './ManageTestimonials.css'
import Col from'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Checkbox from 'react-simple-checkbox'
import TestimonialItem from '../../components/TestimonialItem/TestimonialItem'
import Spinner from '../../components/Spinner/Spinner'
import Dropdown from 'react-bootstrap/Dropdown'
import Toggle from '../../components/Toggle/Toggle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
var superagent = require('superagent')
const uuid = require('uuid')

class ManageTestimonials extends React.PureComponent{
    constructor(props){
        super(props)

        this.state={
            loading: true,
            selected:[]
        }
    }

    componentDidMount(){
        this.fetchTestimonials()
    }

    fetchTestimonials(){
        superagent
        .get('/service/testimonials/api/need_approval')
        .then(res => this.setState({items: res.body}, () => {
            superagent
            .get('/service/testimonials/all')
            .then(res => {
                let items = res.body.filter(item => item.approved === true)
                this.setState({approved: items, loading: false})
            })
        }))
    }

    featureTestimonial(_id, b){
        let testimonial = {_id: _id, featured: b}
        superagent
        .post('/service/testimonials/api/feature')
        .set({'Authorization': localStorage.jwtToken})
        .send({ testimonial })
        .then(res => this.fetchTestimonials())
    }

    modifySelected(bool, id){
        let selected = this.state.selected
        if(bool)
            selected.push(id)
        else selected = selected.filter(item_id => item_id !== id)
        this.setState({selected})
    }

    approveTestimonials(){
        if (this.state.selected.length){
            this.setState({loading: true})
            superagent
            .post('/service/testimonials/api/approve')
            .set({'Authorization': localStorage.jwtToken})
            .send({ testimonials: this.state.selected })
            .then(res => this.setState({selected: [], loading: false}, this.fetchTestimonials()))
        }
    }

    rejectTestimonials(){
        if (this.state.selected.length){
            this.setState({loading: true})
            superagent
            .post('/service/testimonials/api/delete')
            .set({'Authorization': localStorage.jwtToken})
            .send({ testimonials: this.state.selected })
            .then(res => this.setState({selected: [], loading: false}, this.fetchTestimonials()))
        }
    }

    renderActionsDropdown(){
        return(
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Actions
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1" onClick={() => this.approveTestimonials()}>Approve Testimonials</Dropdown.Item>
                    <Dropdown.Item href="#/action-2" onClick={() => this.rejectTestimonials()}>Reject and Dispose</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    }

    createTestimonials(approval=false){
        let items
        if (approval) items = [].concat(this.state.items)
        else items = [].concat(this.state.approved)
        if (items.length)
        return items.map(item => {
                return (
                <Col key={uuid()} xs={12} id="editableTestimonial">
                    {
                        approval
                        ? <Checkbox
                        id={item._id}
                        size={3}
                        color="#83d04a"
                        checked={this.state.selected.includes(item._id)}
                        onChange={bool => this.modifySelected(bool, item._id)}
                        />
                        : <div id="featureTestimonialWrapper">
                                <button 
                                key={uuid()} 
                                id="featureTestimonialButton" 
                                className={item.featured ? 'featuredTestimonial' : 'notFeaturedTestimonial'}
                                onClick={() => this.featureTestimonial(item._id, !item.featured)}
                                >
                                    <FontAwesomeIcon icon={item.featured ? faEye : faEyeSlash}/>
                                </button>
                            </div>
                    }
                    <TestimonialItem item={item}/>
                </Col>
                )
            })
    }

    render(){
        return(
            this.state.loading 
            ?   <Col>
                    <Spinner wrapperStyles={{minWidth: '0%', minHeight: '0%'}}/>
                </Col>
            : <Col>
                <Row id="manageTestimonialsTitleRow">
                    <Col xs={12} lg={4}>
                        <h2 id="projectsTitle">There are {this.state.items.length} testimonials that need attention.</h2>
                    </Col>
                    <Col xs={12} lg={7} id="actionButtonsWrapper">
                        {this.renderActionsDropdown()}
                    </Col>
                </Row>

                <Row id="allTestimonialsWrapper">
                    {this.createTestimonials(true)}
                </Row>

                <Row id="manageTestimonialsTitleRow">
                    <Col xs={12} lg={4}>
                        <h2 id="projectsTitle">Manage Approved Testimonials</h2>
                        <h4 id="featuredNumber">There are {this.state.approved.filter(item => item.featured === true).length} featured items</h4>
                    </Col>
                </Row>

                <Row id="allTestimonialsWrapper">
                    {this.createTestimonials(false)}
                </Row>
             </Col>
             
        )
    }
}

export default ManageTestimonials