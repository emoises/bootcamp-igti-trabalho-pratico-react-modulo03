function formatSalary(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
const inss = {
    "A": {
        value: 1045,
        minValue: 0,
        aliquota: 0.075,
        maxAlq: 78.375,
    },
    "B": {
        value: 2089.60,
        minValue: 1045,
        aliquota: 0.09,
        maxAlq: 94.014,
    },
    "C": {
        value: 3134.40,
        minValue: 2089.60,
        aliquota: 0.12,
        maxAlq: 125.376,
    },
    "D": {
        value: 6101.06,
        minValue: 3134.40,
        aliquota: 0.14,
        maxAlq: 415.3324,
    },
}
const IRPF = {
    "A": {
        minValue: 0.0,
        aliquota: 0.0,
        maxValue: 1903.98,
        parcDedu: 0.00,
    },
    "B": {
        minValue: 1903.98,
        aliquota: 0.075,
        maxValue: 2826.65,
        parcDedu: 142.80,
    },
    "C": {
        minValue: 2826.65,
        aliquota: 0.150,
        maxValue: 3751.05,
        parcDedu: 354.80,
    },
    "D": {
        minValue: 3751.05,
        aliquota: 0.225,
        maxValue: 4664.05,
        parcDedu: 636.13,
    },
    "E": {
        minValue: 4664.05,
        aliquota: 0.275,
        maxValue: 100000000000000000000.00,
        parcDedu: 869.36,
    },
}
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
            discINSS += (salary - minValue) * aliquota
            match = true
        }else if (!match) {
            discINSS += maxAlq
        }
    })
    let barObj = {
        barINSS: `${((discINSS/salary*100).toFixed(2))}%`,
        
    }
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
            // console.log(aliquota)
            // console.log(parcDedu)
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