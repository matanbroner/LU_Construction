import React from 'react'
import styles from './ManageUsers.css'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
import Spinner from '../../components/Spinner/Spinner'
import SkyLight from 'react-skylight';
import ColorPicker from '../../components/ColorPicker/ColorPicker'
import { verifyIsAdmin } from '../../assets/utils/verifyIsAdmin'
const superagent = require('superagent');
const uuid = require('uuid')
const APP_CONSTANTS = require ('../../assets/constants/admin')

const newUserInterfaceStyles = {
    overflowY: 'auto',
    overflowX: 'hidden',
    borderRadius: '10px',
    width: '460px',
    left: '65%',
    top: '35%',
    padding: 0
  }; 

class ManageUsers extends React.PureComponent{
    constructor(props){
        super(props)

        this.state = {
            loading: true,
            edit: false,
            users: [],
            modifiedUsers: [],
            newUser: {}
        }

        this.modifyNewUserState = this.modifyNewUserState.bind(this)
        this.registerUser = this.registerUser.bind(this)
    }

    componentDidMount(){
        verifyIsAdmin(r => {
            if (!r) this.props.history.replace('/user_dash')
        })
        this.fetchUsers()
    }

    fetchUsers(){
        superagent
        .get('/service/users/all')
        .set({'Authorization': localStorage.jwtToken})
        .then(res => {this.setState({loading: false, users: res.body})})
    }

    modifyUser(user, arg, value){
        let modifiedUsers = this.state.modifiedUsers
        let index = modifiedUsers.findIndex(mod => mod._id === user._id)
        if (index !== -1){
            modifiedUsers[index][arg] = value
        }
        else {
            let newUser = Object.assign({}, user)
            if (value)
                newUser[arg] = value
            else{
                index = this.state.users.findIndex(u => u._id === user._id)
                newUser[arg] = this.state.users[index][arg]
            }
            modifiedUsers.push(newUser)
        }
        this.setState({ modifiedUsers })
    }

    modifyNewUserState(e){
        let newUser = this.state.newUser
        let param = e.target.id
        let value = e.target.value
        newUser[param] = value
        this.setState({ newUser }, (e) => {
            if (param === 'name') this.forceUpdate()
        })
    }

    saveModifications(){
        let modifiedUsers = this.state.modifiedUsers
        modifiedUsers.forEach(user => {
            superagent
            .post(process.env.REACT_APP_USERS_URL + '/api/modify')
            .set({'Authorization': localStorage.jwtToken})
            .send({ user: user })
            .then(res => console.log(res))
        })
        this.setState({modifiedUsers: [], edit: false}, () => {this.fetchUsers(); this.forceUpdate()})
    }

    deleteModifications(){
        this.setState({modifiedUsers: [], edit: false}, this.fetchUsers())
    }

    registerUser(e){
        e.preventDefault()
        superagent
            .post(process.env.REACT_APP_USERS_URL + '/api/register')
            .set({'Authorization': localStorage.jwtToken})
            .send({ user: this.state.newUser })
            .then(res => {
                if (res.statusCode === 200){
                    this.fetchUsers()
                    this.newUserDialog.hide()
                }
            })
    }

    renderUsers(){
        return this.state.users.map(user => {
            let display
            let modifiedIndex = this.state.modifiedUsers.findIndex(mod => mod._id === user._id)
            if (modifiedIndex === -1)
                display = Object.assign({}, user)
            else display = Object.assign({}, this.state.modifiedUsers[modifiedIndex])
            let color = display.color
            return(
                ! this.state.edit
                ?   <tr key={uuid()} id="standardUserRow">
                        <td>{display.name}</td>
                        <td>{display.username}</td>
                        <td>{display.role}</td>
                        <td id="userColorWrapper">{display.color}
                            <div style={{background: display.color}} id="userColor"></div>
                        </td>
                    </tr>
                :   <tr key={uuid()} id="modifyUserRow">
                        <td>{this.renderModifyInput('name', display)}</td>
                        <td>{this.renderModifyInput('username', display)}</td>
                        <td>{this.renderRolesDropdown(display)}</td>
                        <td>
                        {this.renderColorPicker(display)}
                        </td>
                    </tr>
            )
        })
    }

    renderRolesDropdown(user){
        let availableRoles = APP_CONSTANTS.roles.filter(role => role !== user.role)
        let options = availableRoles.map(role => {
            return <option value={role} key={uuid()}>{role}</option>
        })
        options.unshift(<option selected value={user.role} key={uuid()}>{user.role}</option>)
        return <select id="rolesDropdown" onChange={(e) => this.modifyUser(user, 'role', e.target.value)} required>
                    {options}
                </select>
    }

    renderNewUserRoles(){
        let options = APP_CONSTANTS.roles.map(role => {
            return <option value={role} key={uuid()}>{role}</option>
        })
        options.unshift(<option selected disabled key={uuid()}>Pick a role</option>)
        return <select class="form-control" id="role" onChange={this.modifyNewUserState} required>
                    {options}
                </select>
    }

    renderColorPicker(user){
        return( 
            <ColorPicker 
                color={user.color} 
                onChange={(color) => {this.modifyUser(user, 'color', color); this.forceUpdate()}}
            />
        )
    }

    renderModifyInput(arg, user){
        return <input 
            type="text" 
            placeholder={user[arg]} 
            onChange={(e) => this.modifyUser(user, arg, e.target.value)}
            />
    }

    renderChangesButtons(){
        return this.state.edit
                ?   <div id="saveChangesWrapper">
                        <button className="btn btn-outline-success" onClick={() => this.saveModifications()}>Save Changes</button>
                        <button className="btn btn-outline-danger" onClick={() => this.deleteModifications()}>Discard Changes</button>
                    </div>
                : null
    }

    renderNewUserForm(){
        return(
            <SkyLight 
                dialogStyles={newUserInterfaceStyles}
                ref={ref => this.newUserDialog = ref} 
                title={<div id="newUserTitle">Register a New User</div>}
                afterClose={() => this.setState({newUser: {}})}
                >
                <form id="newUserForm" onSubmit={this.registerUser}>
                    <div id="newUserFormBody">
                        <Row>
                            <Col>
                                <div className="form-group">
                                    <label htmlFor="name">Employee Name:</label>
                                    <input 
                                    type="text" 
                                    id="name" 
                                    onChange={this.modifyNewUserState}  
                                    className="form-control"
                                    required/>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="form-group">
                                    <label htmlFor="username">Username:</label>
                                    <input 
                                    type="text" 
                                    id="username" 
                                    onChange={this.modifyNewUserState}  
                                    className="form-control"
                                    required/>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="form-group">
                                    <label htmlFor="password">Password:</label>
                                    <input 
                                    type="password" 
                                    id="password" 
                                    onChange={this.modifyNewUserState}  
                                    className="form-control"
                                    required/>
                                </div>
                            </Col>
                            <Col>
                                <div className="form-group">
                                    <label htmlFor="password2">Re-type Password:</label>
                                    <input 
                                    type="password" 
                                    id="password2" 
                                    onChange={this.modifyNewUserState}  
                                    className="form-control"
                                    required/>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input 
                                    type="email" 
                                    id="email" 
                                    onChange={this.modifyNewUserState}  
                                    className="form-control"
                                    required/>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <ColorPicker 
                                    header="User Icon Color"
                                    color={this.state.newUser.color || '#83ab4a'} 
                                    onChange={(color) => {
                                        let newUser = this.state.newUser
                                        newUser.color = color
                                        this.setState({ newUser }, this.forceUpdate())
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col id="roleColumn">
                                <div className="form-group">
                                    <label htmlFor="role">User Role:</label>
                                    {this.renderNewUserRoles()}
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <Col id="submitNewUserWrapper">
                            <button type="submit" id="addNewUser">
                            {
                            this.state.newUser.name 
                            ? 'Register ' + this.state.newUser.name + ' now!'
                            : 'Add New User'
                            }
                            </button>
                        </Col>
                    </Row>
                </form>
            </SkyLight>
        )
    }

    render(){
        return(
            this.state.loading
            ? <Spinner/>
            : <Col>
                <Row id="manageUsersTitleRow">
                    <h1 id="manageUsersTitle">Manage Users</h1>
                </Row>
                <Row>
                    <div id="userTableWrapper">
                        {
                            !this.state.edit
                            ?   <div>
                                    <button className="btn btn-info" id="editUsersButton" onClick={() => this.setState({edit: !this.state.edit})}>Edit Users</button>
                                    <button className="btn btn-warning" id="addUsersButton" onClick={() => this.newUserDialog.show()}>Add New User</button>
                                </div>
                            : null
                        }
                        <h4 id="manageUsersTableHeader">Current Registered Users</h4>
                        <Table striped bordered hover id="userTable">
                            <thead>
                                <tr>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Role</th>
                                <th>Icon Color</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderUsers()}
                            </tbody>
                        </Table>
                        {
                            this.renderChangesButtons()
                        }
                    </div>
                </Row>
                {this.renderNewUserForm()}
            </Col>
        )
    }
}

export default ManageUsers