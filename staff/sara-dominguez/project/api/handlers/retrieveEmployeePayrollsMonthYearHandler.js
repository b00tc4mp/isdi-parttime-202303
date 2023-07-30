const { retrieveEmployeePayrollsMonthYear } = require('../logic')
const { extractEmployeeId } = require('./helpers')
//TODO helper

module.exports = (req, res) => {
    const employeeId = extractEmployeeId(req)

    const { payrollYear } = req.params

    return retrieveEmployeePayrollsMonthYear(employeeId, payrollYear)
        .then(employee => res.json(employee))
}