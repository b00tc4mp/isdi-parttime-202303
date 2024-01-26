const { getMonthNameFromMonthNumber } = require('./helpers')
const { Employee, PayrollMonth } = require('../data/models')
const {
    validators: { validateId, validatePayrollYear, validatePayrollMonth } = require('com'),
    errors: { ExistenceError }
} = require('com')

/**
* Retrieve payroll month to be paid
* 
* @param {string} employeeId  The employee id
* @param {number} payrollYear  The payroll's year to retrieve
* @param {number} payrollMonth  The payroll's month to retrieve
*
* @returns {Promise}  Object with payrolls data for a year and month to process
*
* @throws {TypeError} On non-string employeeId or non-number payrollYear or payrollMonth 
* @throws {ContentError} On employeeId is not hexadecimal or doesn't have 24 characters or payrollYear or payrlollMonth are empty
* @throws {RangeError} On non-integer payrollyear or non-integer between 1 and 12 payrollMonth
* @throws {ExistenceError} On non-existing employee
 */

module.exports = (employeeId, payrollYear, payrollMonth) => {
    validateId(employeeId)
    validatePayrollYear(payrollYear)
    validatePayrollMonth(payrollMonth)

    return (async () => {
        const employee = await Employee.findById(employeeId).lean()

        if (!employee) {
            throw new ExistenceError(`user with id ${employeeId} not found`)
        }

        const payrollsMonthRetrieved = await PayrollMonth.find({ payrollYear: payrollYear, payrollMonth: payrollMonth, status: 'created' }).lean()

        if (!payrollsMonthRetrieved || undefined || payrollsMonthRetrieved.length === 0) {
            throw new ExistenceError('payrolls not found')
        }

        for (let i = 0; i < payrollsMonthRetrieved.length; i++) {
            const monthNumber = payrollsMonthRetrieved[i].payrollMonth

            payrollsMonthRetrieved[i].monthName = getMonthNameFromMonthNumber(monthNumber)
        }

        return payrollsMonthRetrieved
    })()
}