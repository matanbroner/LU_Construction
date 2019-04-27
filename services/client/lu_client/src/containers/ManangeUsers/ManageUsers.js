import React from 'react'
import styles from './ManageUsers.css'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
import Spinner from '../../components/Spinner/Spinner'
const superagent = require('superagent');
const uuid = require('uuid')

class ManageUsers extends React.PureComponent{
    constructor(props){
        super(props)

        this.state = {
            loading: true,
            users: []
        }
    }

    componentDidMount(){
        this.fetchUsers()
    }

    fetchUsers(){
        superagent
        .get('/service/users/all')
        .set({'Authorization': localStorage.jwtToken})
        .then(res => this.setState({loading: false, users: res.body}))
    }

    renderUsers(){
        return this.state.users.map(user => {
            return(
                <tr key={uuid()}>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.role}</td>
                </tr>
            )
        })
    }

    render(){
        return(
            this.state.loading
            ? <Spinner/>
            : <Col>
                <Row>
                    <h1>Manage Users</h1>
                </Row>
                <Row>
                    <div id="userTableWrapper">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderUsers()}
                            </tbody>
                        </Table>
                    </div>
                </Row>
            </Col>
        )
    }
}

export default ManageUsers