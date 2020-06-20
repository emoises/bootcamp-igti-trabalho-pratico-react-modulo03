import React, { Component } from 'react'
import Input from './components/Input/Input'
import { salaryMath } from './helpers/salaryMath';
import InputReadOnly from './components/InputReadOnly/InputReadOnly';
import ProgressBarSalary from './components/ProgressBarSalary/ProgressBarSalary';
import initial_salaryMath from './helpers/salaryMath_initial.json'

export default class App extends Component {
  constructor() {
    super();
    this.state = initial_salaryMath
  }
  

  handleCalculateSalary = (salary) => {
    const inputs = document.getElementsByTagName('input')

    if(salary>=999){
  
        const completeSalaryObj = salaryMath(Number(salary))
        this.setState({
          checkInput: true,
          salaryMath: {...completeSalaryObj.salaryObj},
          barHeight: {...completeSalaryObj.barObj}
        })
      inputs[1].focus()
      inputs[2].focus()
      inputs[3].focus()
      inputs[4].focus()
      inputs[5].focus()
      inputs[0].focus()
    }else{
      
      this.setState({
        checkInput: false,
        barHeight: {
          barINSS: '0%',
          barIRPF: '0%',
          barSalLiq: '100%'
        },

        salaryMath: {
          A: {
            id: 'base_INSS',
            name: 'Base INSS',
            value: ''
          },
          B: {
            id: 'desconto_INSS',
            name: 'Desconto INSS',
            value: ''
          },
          C: {
            id: 'base_IRPF',
            name: 'Base IRPF',
            value: ''
          },
          D: {
            id: 'IRPF',
            name: 'IRPF',
            value: ''
          },
          E: {
            id: 'salario_liquido',
            name: 'Salário líquido',
            value: ''
          },
        }
      })
      inputs[1].focus()
      inputs[2].focus()
      inputs[3].focus()
      inputs[4].focus()
      inputs[5].focus()
      inputs[0].focus()
    }
    
  }

  render() {
    const { salaryMath, barHeight, checkInput } = this.state

    return (
      <div>
        <h1>React salário</h1>
        <Input onChangeInput={this.handleCalculateSalary} />
        <InputReadOnly salaryMath={salaryMath} />
        <ProgressBarSalary barHeight={barHeight} checkInput={checkInput}/>
      </div>
    )
  }
}