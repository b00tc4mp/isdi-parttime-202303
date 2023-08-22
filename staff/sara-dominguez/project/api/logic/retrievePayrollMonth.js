const { getMonthNameFromMonthNumber } = require('./helpers')
const { Employee, PayrollMonth } = require('../data/models')
const {
    validators: { validateId, validatePayrollYear, validatePayrollMonth } = require('com'),
    errors: { ExistenceError }
} = require('com')

/**
* Retrieve payroll month
* 
* @param {string} employeeId  The employee id
* @param {number} payrollYear  The year of the month to check
* @param {number} payrollMonth  The month of the payroll to check
*
* @returns {Promise}  object with payroll data for an specific employee, year and month
*
* @throws {TypeError} On non-string employeeId or non-number payrollYear or payrollMonth 
* @throws {ContentError} On employeeId is not hexadecimal or doesn't have 24 characters or payrollYear or payrollMonth are empty
* @throws {RangeError} On non-integer payrollYear or non-integer between 1 and 12 payrollMonth 
* @throws {ExistenceError} On non-existing employee
 */

module.exports = (employeeId, payrollYear, payrollMonth) => {
    validateId(employeeId)
    validatePayrollYear(payrollYear)
    validatePayrollMonth(payrollMonth)

    return (async () => {
        // try {
        const [employee, payrollMonthRetrieved] = await Promise.all([
            Employee.findById(employeeId).lean(),
            PayrollMonth.find({ employee: employeeId, payrollYear: payrollYear, payrollMonth: payrollMonth, status: "paid" }, '-__v -employee -status').lean()
        ])

        if (!employee) {
            throw new ExistenceError(`user with id ${employeeId} not found`);
        }

        if (!payrollMonthRetrieved || undefined || payrollMonthRetrieved.length === 0) {
            throw new ExistenceError('payroll not found')
        }
        delete payrollMonthRetrieved[0]._id

        const monthNumber = payrollMonthRetrieved[0].payrollMonth

        payrollMonthRetrieved[0].monthName = getMonthNameFromMonthNumber(monthNumber)

        return payrollMonthRetrieved[0]
        // } catch (error) {
        //     throw new Error(error);
        // }
    })()
}

