const { calculatePayroll, checkSalaryScale } = require('./helpers')
const { Employee, PayrollMonth } = require('../data/models')
const {
    validators: { validateId, validatePayrollYear, validatePayrollMonth },
    errors: { ExistenceError, RangeError }
} = require('com')

/**
* Create a new payroll month entry for an employee.
*
* @param {string} employeeId - The ID of the employee.
* @param {number} payrollYear - The year of the payroll month.
* @param {number} payrollMonth - The month of the payroll.
* 
* @returns {Promise} - A Promise that resolves to the created payroll month entry (object)
* 
* @throws {TypeError} On non-string employeeId or non-number payrollYear or payrollMonth 
* @throws {ContentError} On employeeId is not hexadecimal or doesn't have 24 characters or payrollYear or payrollMonth are empty
* @throws {ExistenceError} - If the employee is not found.
* @throws {RangeError} - If the employee's salary level is out of range.
*/

module.exports = function createEmployeePayrollMonth(employeeLoggedId, employeeId, payrollYear, payrollMonth) {
    validateId(employeeLoggedId)
    validateId(employeeId)
    validatePayrollYear(payrollYear)
    validatePayrollMonth(payrollMonth)

    return (async () => {
        const employeeLoggedInId = await Employee.findById(employeeLoggedId)

        if (!employeeLoggedInId) throw new ExistenceError('employeeLoggedId not found')

        const employee = await Employee.findById(employeeId)

        if (!employee) throw new ExistenceError('employee not found')

        salaryLevel = employee.salaryLevel

        if (salaryLevel !== 1 && salaryLevel !== 2 && salaryLevel !== 3 && salaryLevel !== 4 && salaryLevel !== 5)
            throw new RangeError(`${salaryLevel} out of range`)

        const salaryScale = await checkSalaryScale(salaryLevel)

        let monthSalary = salaryScale.monthSalary
        let annualSalary = salaryScale.annualSalary
        let bonus = salaryScale.bonus

        const payrollMonthItems = await calculatePayroll(salaryLevel, monthSalary, annualSalary, bonus)

        let monthSalaryValue = payrollMonthItems.monthSalary
        let bonusValue = payrollMonthItems.bonus
        let irpfTax = payrollMonthItems.irpfTax
        let ssTax = payrollMonthItems.ssTax
        let irpfDeductions = payrollMonthItems.irpfDeductions
        let ssDeductions = payrollMonthItems.ssDeductions
        let totalAmountIncomes = payrollMonthItems.totalAmountIncomes
        let totalAmountDeductions = payrollMonthItems.totalAmountDeductions
        let netSalary = payrollMonthItems.netSalary

        const roundedMonthSalaryValue = parseFloat(monthSalaryValue.toFixed(2))
        const roundedSsDeductions = parseFloat(ssDeductions.toFixed(2))
        const roundedIrpfDeductions = parseFloat(irpfDeductions.toFixed(2))
        const roundedTotalAmountDeductions = parseFloat(totalAmountDeductions.toFixed(2))
        const roundedTotalAmountIncomes = parseFloat(totalAmountIncomes.toFixed(2))
        const roundedNetSalary = parseFloat(netSalary.toFixed(2))


        return PayrollMonth.create({
            employee: employeeId,
            payrollYear,
            payrollMonth,
            salaryLevel,
            status: 'created',
            monthSalary: roundedMonthSalaryValue,
            bonus: bonusValue,
            irpfTax,
            ssTax,
            irpfDeductions: roundedIrpfDeductions,
            ssDeductions: roundedSsDeductions,
            totalAmountIncomes: roundedTotalAmountIncomes,
            totalAmountDeductions: roundedTotalAmountDeductions,
            netSalary: roundedNetSalary
        })
    })()
}



