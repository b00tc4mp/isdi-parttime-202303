const {
    validators: { validateId },
    errors: { ExistenceError, PropertyError }
} = require('com')

const { Employee, PayrollMonth } = require('../data/models')

/**
* Delete payrollMonth
* 
* @param {string} employeeId - employee logged Id
* @param {string} payrollId - payrollId of the payroll to delete 
*
* @returns {Promise}  A promise ends when payrollMonth is deleted
*
@throws {TypeError} On non-string employeeLoggedId or payrollId
* @throws {ContentError} On employeeId or payrollId doesn't have 24 characters or not hexadecimal 
* @throws {Existence} On employee or payrollMonth not found
*/


module.exports = function deletepayroll(employeeId, payrollId) {
    validateId(employeeId)
    validateId(payrollId)

    return (async () => {

        const employee = await Employee.findById(employeeId)

        if (!employee) throw new ExistenceError('employee not found')

        if (employee.accessPermissions !== "Authorized") throw new AuthError("You don't have permission to continue, please contact HR (Human Resources)")

        const payrollMonth = await PayrollMonth.findById(payrollId)

        if (!payrollMonth) throw new ExistenceError('payroll not found')

        await PayrollMonth.deleteOne({ _id: payrollId })
    })()
}
