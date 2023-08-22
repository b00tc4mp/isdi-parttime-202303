const { Employee } = require('../data/models')
const { PayrollMonth } = require('../data/models')
const { findLastMonthAggregated, getMonthNameFromMonthNumber } = require('./helpers')
const {
    validators: { validateId, validatePayrollYear } = require('com'),
    errors: { ExistenceError }
} = require('com')

/**
* Retrieve payroll annual aggregate
* 
* @param {string} employeeId  The employee id
* @param {number} PayrollYear  The year of the aggregated calculation
*
* @returns {Promise}  object with anual aggregate datas for an specific employee and year
*
* @throws {TypeError} On non-string employeeId or non-number payrollYear
* @throws {ContentError} On employeeId is not hexadecimal or doesn't have 24 characters or payrollYear is empty 
* @throws {rangeError} On non -integer number payrollYear
* @throws {ExistenceError} On non-existing employee
 */

module.exports = function retrievePayrollAnnualAggregate(employeeId, payrollYear) {
    validateId(employeeId)
    validatePayrollYear(payrollYear)

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

    return (async () => {
        const [employee, employeePayrollsMonth] = await Promise.all([
            Employee.findById(employeeId).lean(),
            PayrollMonth.find({ employee: employeeId, payrollYear: payrollYear, status: "paid" }).lean()
        ])
        if (!employee) throw new ExistenceError(`user with id ${employeeId} not found`)

        if (!employeePayrollsMonth || employeePayrollsMonth.length === 0) throw new ExistenceError(`payrolls not found`)

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
        const lastMonthAggregated = findLastMonthAggregated(sumPayrollMonth)
        const lastMonthAggregatedName = getMonthNameFromMonthNumber(lastMonthAggregated)

        return payrollAnnualAggregated = {
            payrollYear,
            sumPayrollMonth,
            sumMonthSalary,
            lastMonthAggregatedName,
            sumBonus,
            sumIrpfTax,
            sumSsTax,
            sumIrpfDeductions,
            sumSsDeductions,
            sumTotalAmountIncomes,
            sumTotalAmountDeductions,
            sumNetSalary
        }
    })()
}



