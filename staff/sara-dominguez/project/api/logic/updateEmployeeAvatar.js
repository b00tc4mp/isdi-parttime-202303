//TODO validators and handle Errors
const { Employee } = require('../data/models')

module.exports = function updateEmployeeAvatar(employeeId, newAvatar) {
    // validators

    return Employee.findById(employeeId)
        .then(employee => {
            if (!employee) throw new Error('employee not found')

            employee.avatar = newAvatar

            return Employee.updateOne({ _id: employee.id }, { $set: { avatar: employee.avatar } })
        })
}