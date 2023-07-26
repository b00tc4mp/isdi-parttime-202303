const { Employee } = require('../data/models')
module.exports = function isEmployeeAccessPermissionsAuthorized(employeeId) {

    Employee.findById(employeeId)
        .then(employee => {
            const { accessPermissions } = employee

            if (accessPermissions !== "authorized") throw new Error("You don't have permission to continue, please contact HR (Human Resources)")

            return employee.accessPermissions
        })
}