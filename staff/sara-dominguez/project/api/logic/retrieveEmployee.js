const { Employee } = require('../data/models')
const {
    validators: { validateId },
    // errors: { ExistenceError }
} = require('com')
const { UnknownError } = require('com/errors')


/**
 * Retrieve a employee against his/her id
 * 
 * @param {string} employeeId  The employee id
 * 
 * @returns {Promise} employee  
//  * 
//  * @throws {TypeError} On non-string employeeId
//  * @throws {ContentError} On id doesn't have 24 characters or not hexadecimal
//  * @throws {ExistenceError} On non-existing employee
// 
 */

module.exports = function retrieveEmployee(employeeId) {
    validateId(employeeId)

    const { Employee } = require('../data/models')

    return (async () => {
        try {
            const employee = await Employee.findById(employeeId, 'name firstSurname secondSurname avatar centerAttached professionalPhoneNumber professionalEmail ').lean()

            if (!employee) throw new ExistenceError('employee not found')

            delete employee._id

            return employee
        } catch (error) {
            // throw new UnknownError(error)
            throw new Error(error.message)
        }
    })()
}