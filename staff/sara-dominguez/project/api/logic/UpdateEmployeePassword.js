//TODO validators and handle Errors
const { Employee } = require('../data/models')

module.exports = function updateEmployeePassword(employeeId, employeePassword, employeeNewPassword, employeeConfirmNewPassword) {
    // validators
    debugger
    return Employee.findById(employeeId)
        .then(employee => {
            if (!employee) throw new Error('employee not found')
            if (employeePassword !== employee.employeePassword) throw new Error('wrong actual password')
            if (employeePassword === employeeNewPassword) throw new Error('new password equals password')
            if (employeeNewPassword !== employeeConfirmNewPassword) throw new Error('new password is not the same as confirmed')


            return Employee.updateOne({ _id: employee.id }, { $set: { employeePassword: employeeNewPassword } })
        })

        .then(() => { })
}