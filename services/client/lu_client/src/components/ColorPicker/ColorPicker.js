import React from 'react'
import styles from './ColorPicker.css'

const colors = ['#1796e8', '#83ab4a', '#d41625', '#d329b9', '#ed8100', '#e3cd00']

const ColorPicker = (props) => {

    const createColors = () => {
        let circles = colors.map(color => {
            return(
                <div 
                    id="colorCircle" 
                    style={{background: color, border: props.color === color ? '4px solid gray' : '0'}}
                    onClick={() => props.onChange(color)}
                >
                </div>
            )
        })

        return circles
    }

    return(
        <div id="colorWrapper">
            {props.header ? <label>{props.header}</label> : null}
            <div id="colorPickerWrapper">
                {createColors()}
            </div>
        </div>
    )
}

export default ColorPicker