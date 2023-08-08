//TODO  handle Errors
const { Employee } = require('../data/models')
const { validators: { validateId, validateUrl } } = require('com')

/**
 * Update the avatar of an employee
 * 
* @param {string} employeeId  The employee id number
* @param {string} employeenewAvatar  URL of the new avatar for the employee
* 
* @returns {Promise<void>} Ends when employee avatar is updated
//  * 
//  * @throws {TypeError} On non-string employeeId or URL
//  * @throws {ContentError} On employeeId doesn't have 24 characters or not hexadecimal or empty URL 
//  * @throws {ExistenceError} On non-existing employee
*/

module.exports = function updateEmployeeAvatar(employeeId, newAvatar) {
    validateId(employeeId)
    validateUrl(newAvatar)

    //     return Employee.findById(employeeId)
    //         .then(employee => {
    //             if (!employee) throw new Error('employee not found')

    //             employee.avatar = newAvatar

    //             return Employee.updateOne({ _id: employee.id }, { $set: { avatar: employee.avatar } })
    //         })

    return (async () => {
        try {
            const employee = await Employee.findById(employeeId)
            if (!employee) throw new Error('employee not found')

            employee.avatar = newAvatar

            return Employee.updateOne({ _id: employee.id }, { $set: { avatar: employee.avatar } })
        } catch (error) {
            throw new Error(error.message)
        }
    })()

}