const { getMonthNameFromMonthNumber } = require('./helpers')
const { Employee, PayrollMonth } = require('../data/models')
const {
    validators: { validateId, validatePayrollYear, validatePayrollMonth } = require('com'),
    // errors: { ExistenceError }
} = require('com')

/**
 * Retrieve payroll month
 * 
 * @param {string} employeeId  The employee id
 * @param {number} payrollYear  The ISO Date of the year of the month to check
 * * @param {number} payrollMonth  The month of the payroll to check
* @returns {Promise}  object with payroll data for an specific employee, year and month
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

    // return Promise.all([
    //     Employee.findById(employeeId).lean(),
    //     PayrollMonth.find({ employee: employeeId, payrollYear: payrollYear, payrollMonth: payrollMonth }).lean()
    // ])
    //     .then(([employee, payrollMonth]) => {

    //         if (!employee) throw new Error(`user with id ${employeeId} not found`)
    //         if (!payrollMonth || payrollMonth.length === 0) throw new Error(`payroll not found`)


    //         const monthNumber = payrollMonth[0].payrollMonth

    //         payrollMonth[0].monthName = getMonthNameFromMonthNumber(monthNumber)

    //         const { payrollYear } = payrollMonth[0]

    //         const payrollYearYear = new Date(payrollYear).getFullYear()

    //         payrollMonth[0].payrollYear = payrollYearYear

    //         return payrollMonth[0]
    //     })


    return (async () => {
        try {
            const [employee, payrollMonthRetrieved] = await Promise.all([
                Employee.findById(employeeId).lean(),
                PayrollMonth.find({ employee: employeeId, payrollYear: payrollYear, payrollMonth: payrollMonth }, '-__v -employee').lean()
            ])
            // delete payrollMonthRetrieved[0]._id

            if (!employee) {
                throw new Error(`user with id ${employeeId} not found`);
            }

            if (!payrollMonthRetrieved) {
                throw new Error('payroll not found')
            }

            const monthNumber = payrollMonthRetrieved[0].payrollMonth;

            payrollMonthRetrieved[0].monthName = getMonthNameFromMonthNumber(monthNumber);

            return payrollMonthRetrieved[0];
        } catch (error) {
            throw new Error(error);
        }
    })()
}

