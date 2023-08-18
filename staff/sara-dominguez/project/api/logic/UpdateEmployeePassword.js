const { Employee } = require('../data/models')
const {
    validators: { validateId, validateEmployeePassword },
    errors: { ExistenceError, AuthError, PropertyError }
} = require('com')

/**
* Update employee password
* 
* @param {string} employeeId  The employee id number
* @param {string} employeePassword  Actual employee password
* @param {string} employeenewPassword  New password for employee
* @param {string} employeeConfirmNewPassword  The confirmation of new password for employee
* 
* @returns {Promise<void>} Ends when employee password is updated
* 
* @throws {TypeError} On non-string employeeId or employeePassword or employeeNewPassword or employeeConfirmNewPassword
* @throws {ContentError} On employeeId doesn't have 24 characters or not hexadecimal or employeePassword or employeeNewPassword or employeeConfirmNewPassword doesn't have a digit or an uppercase or a lowercase or an special chararacter (-_+/#&) or are empty
* @throws {RangeError} On employeePassword or employeeNewPassword or employeeConfirmNewPassword length is lower than 6 character or upper than 12
* @throws {ExistenceError} On non-existing employee
* @throws {AuthError} On wrong employeePassword
* @throws {PropertyError} On different value between employeeNewPassword and employeeConfirmNewPassword or equal value between employeePassword and employeeNewPassword
*/


module.exports = function updateEmployeePassword(employeeId, employeePassword, employeeNewPassword, employeeConfirmNewPassword) {
    validateId(employeeId)
    validateEmployeePassword(employeePassword)
    validateEmployeePassword(employeeNewPassword)
    validateEmployeePassword(employeeConfirmNewPassword)

    return (async () => {
        const employee = await Employee.findById(employeeId)

        if (!employee) throw new ExistenceError('employee not found')

        if (!employee) throw new ExistenceError('employee not found')

        if (employeePassword !== employee.employeePassword) throw new AuthError('wrong actual password')

        if (employeePassword === employeeNewPassword) throw new PropertyError('new password equals password')

        if (employeeNewPassword !== employeeConfirmNewPassword) throw new PropertyError('new password is not the same as confirmed')

        employee.employeePassword = employeeNewPassword

        return Employee.updateOne({ _id: employee.id }, { $set: { employeePassword: employee.employeePassword } })
    })()
}