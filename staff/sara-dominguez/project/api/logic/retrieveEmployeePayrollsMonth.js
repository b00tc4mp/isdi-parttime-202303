const { Employee, PayrollMonth } = require('../data/models')

module.exports = function retrieveEmployeePayrollsMonth(employeeId, payrollYear) {
    // TODO validators and errors

    return Promise.all([
        Employee.findById(employeeId).lean(),
        PayrollMonth.find({ employee: employeeId, payrollYear: payrollYear }).lean()
    ])
        .then(([employee, employeePayrollMonth]) => {

            if (!employee) throw new Error(`user with id ${employeeId} not found`)
            if (!employeePayrollMonth) throw new Error(`payroll not found`)


            return employeePayrollMonth

        })

}
