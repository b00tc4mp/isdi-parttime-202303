const { Employee } = require('../data/models')
/**
 * Authenticates a user against his/her credentials
 * 
 * @param {string} employeeNumber  The employee company credential: id number
 * @param {string} employeePassword  employee password
 * 
 * @returns {Promise<string>} The employee id number
//  * 
//  * @throws {TypeError} On non-string email or password
//  * @throws {ContentError} On empty email
//  * @throws {RangeError} On password length lower than 6 characters and upper than 15 characters
//  * @throws {ExistenceError} On non-existing user
//  * @throws {AuthError} On wrong credentials
 */

module.exports = function authenticateEmployee(employeeNumber, employeePassword) {
    //TODO validators

    return Employee.findOne({ employeeNumber })
        .then(employee => {
            if (!employee) throw new error('user not found')
            if (employee.accessPermissions !== "authorized") throw new Error("You don't have permission to continue, please contact HR (Human Resources)")
            if (employee.employeePassword !== employeePassword) throw new Error('error credentials')


            return employee.id
        })
}