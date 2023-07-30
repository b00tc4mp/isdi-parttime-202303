const { Employee, PayrollMonth } = require('../data/models')

module.exports = (employeeId, payrollYearIsoDate, payrollMonth) => {
    // TODO validators and errors

    return Promise.all([
        Employee.findById(employeeId).lean(),
        PayrollMonth.find({ employee: employeeId, payrollYear: payrollYearIsoDate, payrollMonth: payrollMonth }).lean()
    ])
        .then(([employee, payrollMonth]) => {

            if (!employee) throw new Error(`user with id ${employeeId} not found`)
            if (!payrollMonth || payrollMonth.length === 0) throw new Error(`payroll not found`)

            return payrollMonth
        })
}

