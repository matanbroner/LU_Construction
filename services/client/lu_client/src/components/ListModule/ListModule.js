
import React from 'react'
import styles from './ListModule.css'
import { faTrashAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
const uuid = require('uuid')

class ListModule extends React.PureComponent{
    constructor(props){
        super(props)

        this.state= {
            title: '',
            items: [],
            newItem: ''
        }
        this.addItem = this.addItem.bind(this)
        this.handleChange=this.handleChange.bind(this)
    }

    componentDidMount(){
        let items = this.props.items.map(item => {
            return {
                id: uuid(),
                item: item
            }
        })
        this.setState({
            title: this.props.title,
            items: items
        })
    }

    addItem(e){
        let items = this.state.items
        if (this.state.newItem !== '')
            items.push({
                id: uuid(),
                item: this.state.newItem
            })
        this.setState({
            items: items,
            newItem: ''
        })
        this.props.manageItems(items)
    }

    removeItem(id){
        console.log(id)
        let items = this.state.items
        let newItems = items.filter(item => item.id !== id)
        this.setState({items: newItems})
        this.props.manageItems(newItems)
    }

    handleChange(e){
        this.setState({ newItem: e.target.value })
    }

    renderItems(){
        return this.state.items.map(item => {
            return( 
                <li id={item.id} className="list-group-item listModuleItem">{item.item} 
                    <button id={item.id} className="removeItemButton" onClick={() => this.removeItem(item.id)}>
                        <FontAwesomeIcon icon={faTrashAlt}/>
                    </button>
                </li>
            )
        })
    }

    render(){
        return (
        <div id="listModuleWrapper">
            <label for="listModule" id="titleListModule">{this.state.title}</label>
            {this.props.smallText}
            <ul className="list-group listItemsAll">
                {this.renderItems()}
            </ul>
            <div id="inputAndSubmit">
                <input className="form-control" placeholder={this.props.placeholder} onChange={this.handleChange}/>
                <button id="addButton" onClick={this.addItem}><FontAwesomeIcon icon={faPlusCircle}/></button>
            </div>
        </div>
        )
    }
}

export default ListModule