//TODO  handle Errors
const { Employee } = require('../data/models')
const { validators: { validateId, validateEmployeePassword } } = require('com')


/**
 * Update the password of an employee
 * 
* @param {string} employeeId  The employee id number
* @param {string} employeePassword  Actual employee password
* @param {string} employeenewPassword  New password for employee
* @param {string} employeeConfirmNewPassword  The confirmation of new password for employee
* 
* @returns {Promise<void>} Ends when employee password is updated
//  * 
//  * @throws {TypeError} On non-string password or employeeId
//  * @throws {ContentError} On password doesn't have a digit or an uppercase or a lowercase or an special chararacter or is empty
//  * @throws {RangeError} On password length doesn't lower than 6 character or upper than 12
//  * @throws {ExistenceError} On non-existing employee

*/

module.exports = function updateEmployeePassword(employeeId, employeePassword, employeeNewPassword, employeeConfirmNewPassword) {
    validateId(employeeId)
    validateEmployeePassword(employeePassword)
    validateEmployeePassword(employeeNewPassword)
    validateEmployeePassword(employeeConfirmNewPassword)

    return (async () => {
        try {
            const employee = await Employee.findById(employeeId)
            if (!employee) throw new Error('employee not found')

            if (!employee) throw new Error('employee not found')
            if (employeePassword !== employee.employeePassword) throw new Error('wrong actual password')
            if (employeePassword === employeeNewPassword) throw new Error('new password equals password')
            if (employeeNewPassword !== employeeConfirmNewPassword) throw new Error('new password is not the same as confirmed')

            employee.employeePassword = employeeNewPassword

            return Employee.updateOne({ _id: employee.id }, { $set: { employeePassword: employee.employeePassword } })
        } catch (error) {
            throw new Error(error.message)
        }
    })()
}