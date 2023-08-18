const { calculatePayroll, checkSalaryScale } = require('./helpers')
const { Employee, PayrollMonth } = require('../data/models')
const {
    validators: { validateId },
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

module.exports = function createEmployeePayrollMonth(employeeId, payrollYear, payrollMonth) {
    //TODO validators 


    return Employee.findById(employeeId)

        .then(employee => {
            if (!employee) throw new ExistenceError('employee not found')

            salaryLevel = employee.salaryLevel

            if (salaryLevel !== 1 && salaryLevel !== 2 && salaryLevel !== 3 && salaryLevel !== 4 && salaryLevel !== 5)
                throw new RangeError(`${salaryLevel} out of range`)

            return salaryLevel
        })
        .then((salaryLevel) => checkSalaryScale(salaryLevel))
        .then((salaryScale) => {
            let monthSalary = salaryScale.monthSalary
            let annualSalary = salaryScale.annualSalary
            let bonus = salaryScale.bonus

            return calculatePayroll(salaryLevel, monthSalary, annualSalary, bonus)
        })
        .then((payrollMonthItems) => {
            let monthSalary = payrollMonthItems.monthSalary
            let bonus = payrollMonthItems.bonus
            let irpfTax = payrollMonthItems.irpfTax
            let ssTax = payrollMonthItems.ssTax
            let irpfDeductions = payrollMonthItems.irpfDeductions
            let ssDeductions = payrollMonthItems.ssDeductions
            let totalAmountIncomes = payrollMonthItems.totalAmountIncomes
            let totalAmountDeductions = payrollMonthItems.totalAmountDeductions
            let netSalary = payrollMonthItems.netSalary

            return PayrollMonth.create({
                employee: employeeId,
                payrollYear,
                payrollMonth,
                salaryLevel,
                status: 'created',
                monthSalary: monthSalary,
                bonus,
                irpfTax,
                ssTax,
                irpfDeductions,
                ssDeductions,
                totalAmountIncomes,
                totalAmountDeductions,
                netSalary
            })

        })

}



