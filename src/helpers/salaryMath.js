function formatSalary(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
const inss = require('./INSS.json');
const IRPF = require('./IRPF.json');
function salaryMath(salary) {
    let match= false;
    let salaryObj ={};
    let discINSS = 0;
    let discIRPF = 0;
    let alqArray = [];
    let vleArray = [];
    let maxValueArray = [];

    Object.keys(inss).forEach( key => {
        const { value, minValue, aliquota, maxAlq} =inss[key]
        
        alqArray = [...alqArray, aliquota]
        vleArray = [...vleArray, value]
        maxValueArray = [...maxValueArray, maxAlq]
        if (salary <= value && salary > minValue) {
            console.log(salary)
            console.log(minValue)
            console.log(aliquota)
            discINSS += (salary - minValue) * aliquota
            match = true
        }else if (!match) {
            discINSS += maxAlq
        }
    })
    let barObj = {
        barINSS: `${((discINSS/salary*100).toFixed(2))}%`,
        
    }
    //Neste ponto, salaryObj calcula os valores =
    salaryObj = {
        A:{
            id: 'base_INSS',
            name: 'Base INSS',
            value: formatSalary(salary)
        },
        B:{
            id: 'desconto_INSS',
            name: 'Desconto INSS',
            value: `${formatSalary(discINSS)} (${(discINSS / salary*100).toFixed(2)}%)`
        },
        C:{
            id: 'base_IRPF',
            name: 'Base IRPF',
            value: formatSalary(salary - discINSS)
        },
    }
    Object.keys(IRPF).forEach( key => {
        const { minValue, maxValue, aliquota, parcDedu } = IRPF[key];
        if ( ( salary - discINSS ) > minValue && ( salary - discINSS ) <= maxValue ) {
            
            discIRPF = (salary - discINSS) * aliquota - parcDedu
        }
    })
    barObj = {
        ...barObj,
        barIRPF: `${((discIRPF / salary)*100).toFixed(2)}%`,
        barSalLiq: `${(((salary - discINSS - discIRPF) / salary)*100).toFixed(2)}%`,
    }
    salaryObj = {
        ...salaryObj,
        D: {
            id: 'IRPF',
            name: 'IRPF',
            value: `${formatSalary(discIRPF)} (${((discIRPF / salary)*100).toFixed(2)}%)`
        },
        E: {
            id: 'salario_liquido',
            name: 'Salário líquido',
            value: `${formatSalary(salary - discINSS - discIRPF)} (${(((salary - discINSS - discIRPF) / salary)*100).toFixed(2)}%)`
        },
    }
    let completeSalaryObj = {
        salaryObj,
        barObj
    }
    return completeSalaryObj
}
export { salaryMath, formatSalary }