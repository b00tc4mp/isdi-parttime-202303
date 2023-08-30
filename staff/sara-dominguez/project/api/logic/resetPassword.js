const { Employee } = require('../data/models')
const {
    validators: { validateId, validateEmployeeNumber },
    errors: { ExistenceError, AuthError, PropertyError }
} = require('com')

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