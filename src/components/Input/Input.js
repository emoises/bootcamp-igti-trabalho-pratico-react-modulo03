import React, { Component } from 'react'

export default class Input extends Component {
    
    handleChange = (event) => {
        // console.log(event.target.value)
        const newSalary = event.target.value
        this.props.onChangeInput(newSalary)
    }
    render() {
        return (
    
                <div width="80%" className="input-field col s6">
                    <input 
                    type="number" 
                    step="100" 
                    min="1000" 
                    id="icon_prefix" 
                    className="input_salary"
                    onChange={this.handleChange}
                    />
                    <label htmlFor="icon_prefix">Salário bruto</label>
                </div>
           
        )
    }
}

