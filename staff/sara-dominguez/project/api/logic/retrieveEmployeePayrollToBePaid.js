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

module.exports = function retrieveEmployeePayrollToBePaid(id, employeeId) {
    validateId(id)
    validateId(employeeId)

    return (async () => {
        try {
            const employeeLogged = await Employee.findById(employeeId).lean()

            if (!employeeLogged) throw new ExistenceError('employee not found')

            const employee = await Employee.findById(id, '-idCardNumber -tssNumber -jobPosition -department -centerAttached -adress -personalPhoneNumber -typeOfContract -roll -professionalPhoneNumber -professionalEmail -accessPermissions -employeePassword -__v').lean()

            delete employee._id

            if (!employee) throw new ExistenceError('employee not found')

            console.log(employee)
            return employee
        } catch (error) {
            // throw new UnknownError(error)
            throw new Error(error.message)
        }
    })()
}