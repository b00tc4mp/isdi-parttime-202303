const { Employee } = require('../data/models')
const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')
const { UnknownError } = require('com/errors')

/**
* Retrieve a employee against his/her id
* 
* @param {string} employeeId  The employee id
* 
* @returns {Promise} employee  
* 
* @throws {TypeError} On non-string employeeId
* @throws {ContentError} On id doesn't have 24 characters or not hexadecimal
* @throws {ExistenceError} On non-existing employee
 */

module.exports = function retrieveEmployeePayrollData(employeeId) {
    validateId(employeeId)

    return (async () => {
        const employee = await Employee.findById(employeeId, '-address -personalPhoneNumber -typeOfContract -roll -professionalPhoneNumber -professionalEmail -accessPermissions -employeePassword -__v').lean()

        if (!employee) throw new ExistenceError('employee not found')

        delete employee._id

        return employee
    })()
}