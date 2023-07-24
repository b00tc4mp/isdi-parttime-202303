//TODO validators and handle Errors
const { Employee } = require('../data/models')

module.exports = function updateEmployeePassword(employeeId, employeePassword, employeeNewPassword, employeeConfirmNewPassword) {
    // validators
    debugger
    return Employee.findById(employeeId)
        .then(employee => {
            if (!employee) throw new Error('employee not found')
            if (employeePassword === employeeNewPassword) throw new Error('new password equals password')
            if (employeeNewPassword !== employeeConfirmNewPassword) throw new Error('wrong password')


            return Employee.updateOne({ _id: employee.id }, { $set: { employeePassword: employeeNewPassword } })
        })

        .then(() => { })
}