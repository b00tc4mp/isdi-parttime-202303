const { Employee, PayrollMonth } = require('../data/models')

module.exports = function retrieveEmployeePayrollsMonth(employeeId, payrollYear) {
    // TODO validators and errors

    return Promise.all([
        Employee.findById(employeeId).lean(),
        PayrollMonth.find({ employee: employeeId, payrollYear: payrollYear }, '-__v').lean()

    ])


        .then(([employee, employeePayrollsMonth]) => {
            try {
                if (!employee) throw new Error(`user with id ${employeeId} not found`)
                if (!employeePayrollsMonth || employeePayrollsMonth.length === 0) throw new Error(`payrolls not found`)

            } catch (error) {
                throw new Error(error)
            }
            return employeePayrollsMonth
        })
}
