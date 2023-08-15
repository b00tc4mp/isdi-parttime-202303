//TODO  handle Errors
const { PayrollMonth, Employee } = require('../data/models')
const { validators: { validateId, validateUrl } } = require('com')

/**
 * Update payroll status to paid 
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

module.exports = function updatePayrollStatusToPaid(employeeId, _id) {
    validateId(employeeId)
    validateId(_id)

    return (async () => {
        try {
            const employee = await Employee.findById(employeeId)

            if (!employee) throw new Error('employee not found')


            return PayrollMonth.updateOne({ _id: _id }, { $set: { status: "paid" } })
        } catch (error) {
            throw new Error(error.message)
        }
    })()

}