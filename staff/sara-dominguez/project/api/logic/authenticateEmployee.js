const {
    validators: { validateEmployeeNumber, validateEmployeePassword },
    errors: { ExistenceError, AuthError }
} = require('com')
const { Employee } = require('../data/models')
/**
* Authenticate a employee against his/her credentials
* 
* @param {string} employeeNumber  The employee number
* @param {string} employeePassword  The employee password
* 
* @returns {Promise} A promise, return employee id number
* 
* @throws {TypeError} On non-string employeeNumber
* @throws {ContentError} On empty employeeNumber or does not have 5 characters
* @throws {ExistenceError} On non-existing employee
* @throws {AuthError} On wrong credentials
 */

module.exports = function authenticateEmployee(employeeNumber, employeePassword) {
    validateEmployeeNumber(employeeNumber)
    validateEmployeePassword(employeePassword)

    return (async () => {
        const employee = await Employee.findOne({ employeeNumber })

        if (!employee) throw new ExistenceError('employee not found')
        if (employee.accessPermissions !== "Authorized") throw new AuthError("You don't have permission to continue, please contact HR (Human Resources)")
        if (employee.employeePassword !== employeePassword) throw new AuthError('Error credentials')
        if (employeePassword === `Be-${employeeNumber}`) {
            employee.employeePasswordToChange = true
            employee.save()
        }

        return employee.id
    })()
}