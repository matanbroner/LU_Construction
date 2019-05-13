import React from 'react'
import styles from './ManageTestimonials.css'
import Col from'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Checkbox from 'react-simple-checkbox'
import TestimonialItem from '../../components/TestimonialItem/TestimonialItem'
import Spinner from '../../components/Spinner/Spinner'
import Dropdown from 'react-bootstrap/Dropdown'

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
        .then(res => this.setState({items: res.body, loading: false}))
    }

    modifySelected(bool, id){
        let selected = this.state.selected
        if(bool)
            selected.push(id)
        else selected = selected.filter(item_id => item_id !== id)
        this.setState({selected})
    }

    approveTestimonials(){
        this.setState({loading: true})
        superagent
        .post('/service/testimonials/api/approve')
        .set({'Authorization': localStorage.jwtToken})
        .send({ testimonials: this.state.selected })
        .then(res => this.setState({selected: [], loading: false}, this.fetchTestimonials()))
    }

    rejectTestimonials(){
        this.setState({loading: true})
        superagent
        .post('/service/testimonials/api/delete')
        .set({'Authorization': localStorage.jwtToken})
        .send({ testimonials: this.state.selected })
        .then(res => this.setState({selected: [], loading: false}, this.fetchTestimonials()))
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
                    <Dropdown.Item href="#/action-3">Feature on Homepage</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    }

    createTestimonials(){
        return this.state.items.map(item => {
            return (
            <Col key={uuid()} xs={12} id="editableTestimonial">
                <Checkbox
                id={item._id}
                size={3}
                color="#83d04a"
                checked={this.state.selected.includes(item._id)}
                onChange={bool => this.modifySelected(bool, item._id)}
                />
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
                    {this.createTestimonials()}
                </Row>
             </Col>
        )
    }
}

export default ManageTestimonials