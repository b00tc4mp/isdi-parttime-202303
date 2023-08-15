//TODO handleError
const { validateEmployeeNumber, validateEmployeePassword } = require('com/validators')
const { Employee } = require('../data/models')
/**
 * Authenticate a employee against his/her credentials
 * 
 * @param {string} employeeNumber  The employee number
 * @param {string} employeePassword  The employee password
 * 
 * @returns {Promise} A promise, return employee id number
//  * 
//  * @throws {TypeError} On non-string employeeNumber
//  * @throws {ContentError} On empty employeeNumber or does not have 5 characters
//  * @throws {ExistenceError} On non-existing employee
//  * @throws {AuthError} On wrong credentials
 */

module.exports = function authenticateEmployee(employeeNumber, employeePassword) {
    validateEmployeeNumber(employeeNumber)
    validateEmployeePassword(employeePassword)

    return (async () => {
        try {
            const employee = await Employee.findOne({ employeeNumber })
            if (!employee) throw new Error('employee not found')
            if (employee.accessPermissions !== "authorized") throw new Error("You don't have permission to continue, please contact HR (Human Resources)")
            if (employee.employeePassword !== employeePassword) throw new Error('error credentials')

            return employee.id
        } catch (error) {
            throw new Error(error.message)
        }
    })()
}