const { Employee } = require('../data/models')

module.exports = function retrievePayrollAnnualAggregate(employeeId, payrollYear, employeePayrollsMonth) {

    //TODO VALIDATORS AND ERRORS

    let sumPayrollMonth = []
    let sumMonthSalary = 0
    let sumBonus = 0
    let sumIrpfTax = 0
    let sumSsTax = 0
    let sumIrpfDeductions = 0
    let sumSsDeductions = 0
    let sumTotalAmountIncomes = 0
    let sumTotalAmountDeductions = 0
    let sumNetSalary = 0


    return Employee.findById(employeeId)
        .then(employee => {
            if (!employee) throw new Error('employee not found')
        })

        .then(() => {
            for (let i = 0; i < employeePayrollsMonth.length; i++) {

                const payrollMonthValue = employeePayrollsMonth[i].payrollMonth
                const monthSalaryValue = employeePayrollsMonth[i].monthSalary
                const bonusValue = employeePayrollsMonth[i].bonus
                const irpfTaxValue = employeePayrollsMonth[i].irpfTax
                const ssTaxValue = employeePayrollsMonth[i].ssTax
                const irpfDeductionsValue = employeePayrollsMonth[i].irpfDeductions
                const ssDeductionsValue = employeePayrollsMonth[i].ssDeductions
                const totalAmountIncomesValue = employeePayrollsMonth[i].totalAmountIncomes
                const totalAmountDeductionsValue = employeePayrollsMonth[i].totalAmountDeductions
                const netSalaryValue = employeePayrollsMonth[i].netSalary

                //TODO helper para que deje como valor el mes mas cercano a la peticion del usuario, asi si un usuario quiere ver el agregado el 10 de junio, se le muestre el agregado hasta mayo
                sumPayrollMonth.push(payrollMonthValue)
                sumMonthSalary += monthSalaryValue
                sumBonus += bonusValue
                sumIrpfDeductions += irpfDeductionsValue
                sumSsDeductions += ssDeductionsValue
                sumTotalAmountIncomes += totalAmountIncomesValue
                sumTotalAmountDeductions += totalAmountDeductionsValue
                sumNetSalary += netSalaryValue


                if (!sumIrpfTax) {
                    sumIrpfTax = irpfTaxValue
                }
                if (!sumSsTax) {
                    sumSsTax = ssTaxValue
                }

            }

            return employeePayrollAnnualAggregated = {
                payrollYear,
                sumPayrollMonth,
                sumMonthSalary,
                sumBonus,
                sumIrpfTax,
                sumSsTax,
                sumIrpfDeductions,
                sumSsDeductions,
                sumTotalAmountIncomes,
                sumTotalAmountDeductions,
                sumNetSalary
            }
        })
        .catch((error) => { throw new Error(error) })
}



