//TODO  handle Errors
const { PayrollMonth, Employee } = require('../data/models')
const {
    validators: { validateId, validateUrl },
    errors: { ExistenceError, }
} = require('com')

/**
* Update payroll status to paid 
* 
* @param {string} employeeId  The logged employee id number
* @param {string} _id  The payrollMonth _id to change
* 
* @returns {Promise<void>} Ends when payrollMonth status is updated
* 
* @throws {TypeError} On non-string employeeId or _id
* @throws {ContentError} On employeeId or _id doesn't have 24 characters or not hexadecimal 
* @throws {ExistenceError} On non-existing employee or payrollMonth
*/

module.exports = function updatePayrollStatusToPaid(employeeId, _id) {
    validateId(employeeId)
    validateId(_id)

    return (async () => {
        const employee = await Employee.findById(employeeId)

        if (!employee) throw new ExistenceError('employee not found')

        const payrollMonth = await PayrollMonth.findById(_id)

        if (!payrollMonth) throw new ExistenceError('payrollMonth not found')

        payrollMonth.status = "paid"

        return payrollMonth.save()
    })()
}