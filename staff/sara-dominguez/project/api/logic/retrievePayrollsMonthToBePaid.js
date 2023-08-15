const { getMonthNameFromMonthNumber } = require('./helpers')
const { Employee, PayrollMonth } = require('../data/models')
const {
    validators: { validateId, validatePayrollYear, validatePayrollMonth } = require('com'),
    // errors: { ExistenceError }
} = require('com')

/**
 * Retrieve payroll month to be paid
 * 
 * @param {string} employeeId  The employee id
 * @param {number} payrollYear  The year of the month to retrieve
 * * @param {number} payrollMonth  The month of the payroll to retrieve
* @returns {Promise}  object with payrolls data for a year and month to process
//  * 
//  * @throws {TypeError} On non-string employeeId or not a date payrollYear or payrollMonth is not a number
//  * @throws {ContentError} On employeeId is not hexadecimal or doesn't have 24 characters or payrollYear is empty or payrlollMonth is empty
//  * @throws {RangeError} On payrollMonth is not a integer between 1 and 12 
//  * @throws {ExistenceError} On non-existing employee
// 
 */

module.exports = (employeeId, payrollYear, payrollMonth) => {
    validateId(employeeId)
    validatePayrollYear(payrollYear)
    validatePayrollMonth(payrollMonth)


    return (async () => {
        try {
            const employee = await Employee.findById(employeeId).lean()

            if (!employee) {
                throw new Error(`user with id ${employeeId} not found`);
            }

            const payrollsMonthRetrieved = await PayrollMonth.find({ payrollYear: payrollYear, payrollMonth: payrollMonth, status: 'created' }).lean()


            console.log(payrollsMonthRetrieved)
            if (!payrollsMonthRetrieved) {
                throw new Error('payroll not found')
            }
            console.log(payrollsMonthRetrieved)

            for (let i = 0; i < payrollsMonthRetrieved.length; i++) {
                const monthNumber = payrollsMonthRetrieved[i].payrollMonth;

                payrollsMonthRetrieved[i].monthName = getMonthNameFromMonthNumber(monthNumber)
            }
            console.log(payrollsMonthRetrieved)
            return payrollsMonthRetrieved;
        } catch (error) {
            throw new Error(error);
        }
    })()
}