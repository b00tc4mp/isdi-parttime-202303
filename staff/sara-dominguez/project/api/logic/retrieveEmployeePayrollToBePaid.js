const { Employee } = require('../data/models')
const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')

/**
* Retrieve a employee against his/her id
* 
* @param {string} employeeId  The employee logged id
* @param {string} id  The id of employee to find
*
* @returns {Promise} employee  
* 
* @throws {TypeError} On non-string employeeId od id
* @throws {ContentError} On id or employeeId doesn't have 24 characters or not hexadecimal
* @throws {ExistenceError} On non-existing employee
 */

module.exports = function retrieveEmployeePayrollToBePaid(id, employeeId) {
    validateId(id)
    validateId(employeeId)

    return (async () => {
        const employeeLogged = await Employee.findById(employeeId).lean()

        if (!employeeLogged) throw new ExistenceError('employee not found')

        const employee = await Employee.findById(id, '-idCardNumber -tssNumber -jobPosition -department -centerAttached -address -personalPhoneNumber -typeOfContract -roll -professionalPhoneNumber -professionalEmail -accessPermissions -employeePassword -__v').lean()

        delete employee._id

        if (!employee) throw new ExistenceError('employee not found')

        return employee
    })()
}