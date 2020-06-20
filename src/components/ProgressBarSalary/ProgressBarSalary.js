import React, { Component } from 'react'

export default class ProgressBarSalary extends Component {
    render() {
        const { barINSS, barIRPF, barSalLiq } = this.props.barHeight
   

        return (
            <div 
            id="bar"
            style={
                    {
                        
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: '3%',
                width: '94%',
                height: '25px',
                
                    }
                }>
                <div 
                id="inss_bar" 
                style={
                        {
                            width: barINSS, 
                            height:'20px',
                            backgroundColor:"#e67e22" 
                        }
                    }>
                </div>
                <div 
                id="inss_bar" 
                style={
                        {
                            width: barIRPF, 
                            height:'20px',
                            backgroundColor:"#c0392b" 
                        }
                    }>
                </div>
                <div 
                id="inss_bar" 
                style={
                        {
                            width: barSalLiq, 
                            height:'20px',
                            backgroundColor:"#16a085" 
                        }
                    }>
                </div>
            </div>
        )

    }
}

