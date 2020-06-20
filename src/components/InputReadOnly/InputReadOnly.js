import React, { Component } from 'react'

export default class InputReadOnly extends Component {
    // handleChangeReadOnly(e){
    //     console.log(e.target)
    // }
    render() {
        // eslint-disable-next-line
        const objSalary = this.props.salaryMath
        const {checkInput} = this.props
        console.log(checkInput)
        return (
            <div>

                <div className="input-ready">
                    {
                        Object.keys(objSalary).map( (key) => {
                            
                            return (
                                <div key={"div_"+objSalary[key].id} className="input-field col s6">
                                        <input 
                                            key={'input_'+objSalary[key].id} 
                                            id={'input_' + objSalary[key].id}
                                            type="text" 
                                            className="validate" 
                                            value={ objSalary[key].value } 
                                            // autoFocus
                                            // onChange={this.handleChangeReadOnly}
                                            readOnly
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
