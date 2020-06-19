import React, { Component } from 'react'

export default class InputReadOnly extends Component {

    render() {
        // eslint-disable-next-line
        const objSalary = this.props.salaryMath
        console.log(objSalary)
        return (
            <div>

                <div className="input-ready">
                    {
                        Object.keys(objSalary).map( (key) => {
                            console.log(objSalary[key])
                            
                            return (
                                <div key={"div_"+objSalary[key].id} className="input-field col s6">
                                        <input 
                                            key={'input_'+objSalary[key].id} 
                                            id={'input_' + objSalary[key].id}
                                            type="text" 
                                            className="validate" 
                                            value={ objSalary[key].value } 
                                            disabled
                                        />
                                        <label 
                                            className="label_input_ready"
                                            key={'label_'+objSalary[key].id} 
                                            htmlFor={'input_' + objSalary[key].id}>
                                            {objSalary[key].name}
                                        </label>
                                </div>

                            )
                        })
                    }
                    
                </div>
            </div>
        )
    }
}
