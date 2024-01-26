const { Employee } = require('../data/models')
const {
    validators: { validateId, validateUrl },
    errors: { ExistenceError, PropertyError }
} = require('com')

/**
* Update employee avatar
* 
* @param {string} employeeId  The employee id number
* @param {string} employeenewAvatar  URL of the new avatar for the employee
* 
* @returns {Promise<void>} Ends when employee avatar is updated
* 
* @throws {TypeError} On non-string employeeId or URL
* @throws {ContentError} On employeeId doesn't have 24 characters or not hexadecimal or empty URL 
* @throws {ExistenceError} On non-existing employee
* @throws {propertyError} On non-different value between actual employeeAvatar and newAvatar
*/

module.exports = function updateEmployeeAvatar(employeeId, newAvatar) {
    validateId(employeeId)
    validateUrl(newAvatar)

    return (async () => {
        const employee = await Employee.findById(employeeId)

        if (!employee) throw new ExistenceError('employee not found')

        if (employee.avatar === newAvatar) throw new PropertyError('new avatar equals actual avatar')

        employee.avatar = newAvatar

        return Employee.updateOne({ _id: employee.id }, { $set: { avatar: employee.avatar } })
    })()
}