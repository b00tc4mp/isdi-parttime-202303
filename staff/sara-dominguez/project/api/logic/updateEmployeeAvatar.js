//TODO  handle Errors
const { Employee } = require('../data/models')
const { validators: { validateId, validateUrl } } = require('com')

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