const { Employee } = require('../data/models')
const {
    validators: { validateId, validateEmployeeNumber },
    errors: { ExistenceError, AuthError, PropertyError }
} = require('com')


/**
* Reset employee password
* 
* @param {string} employeeLoggedId  employee logged id 
* @param {string} employeeNumber  employee number
* 
* @returns {Promise} Ends when employee password is reset
* 
* @throws {TypeError} On non-string employeeLoggedId or employeeNumber
* @throws {ContentError} On employeeLoggedId doesn´t have 24 characters or employeeNumber is empty or don´t have 5 characters
* @throws {ExistenceError} On employee is not found
*
*/

module.exports = function resetPassword(employeeLoggedId, employeeNumber) {
    validateId(employeeLoggedId)
    validateEmployeeNumber(employeeNumber)

    return (async () => {

        const employeeLogged = await Employee.findById(employeeLoggedId)

        if (!employeeLogged) throw new ExistenceError('employee not found')

        const employee = await Employee.findOne({ employeeNumber: employeeNumber })

        if (!employee) throw new ExistenceError('employee not found')

        employee.employeePassword = `Be-${employeeNumber}`
        employee.employeePasswordToChange = true

        return Employee.updateOne({ _id: employee.id }, { $set: { employeePassword: employee.employeePassword, employeePasswordToChange: employee.employeePasswordToChange } })
    })()
}