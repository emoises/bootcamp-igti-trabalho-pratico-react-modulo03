import React, { Component } from 'react'
import Input from './components/Input/Input'
import { salaryMath } from './helpers/salaryMath';
import InputReadOnly from './components/InputReadOnly/InputReadOnly';
import ProgressBarSalary from './components/ProgressBarSalary/ProgressBarSalary';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      barHeight:{
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
    }
  }
  handleCalculateSalary = (salary) => {
    if(salary>=1000){
      const completeSalaryObj = salaryMath(Number(salary))
      this.setState({
        salaryMath: {...completeSalaryObj.salaryObj},
        barHeight: {...completeSalaryObj.barObj}
      })
    }else{
      this.setState({
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
    }
  }

  render() {
    const { salaryMath, barHeight } = this.state
    console.log(barHeight.barINSS)
    console.log(barHeight.barIRPF)
    console.log(barHeight.barSalLiq)
    return (
      <div>
        <h1>React salário</h1>
        <Input onChangeInput={this.handleCalculateSalary} />
        <InputReadOnly salaryMath={salaryMath} />
        <ProgressBarSalary barHeight={barHeight}/>
      </div>
    )
  }
}