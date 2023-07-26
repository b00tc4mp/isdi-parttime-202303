const { retrieveEmployeePayrollsMonth } = require('../logic')
const { extractEmployeeId } = require('./helpers')
//TODO helper

module.exports = (req, res) => {
    const employeeId = extractEmployeeId(req)

    const { payrollYear } = req.body

    return retrieveEmployeePayrollsMonth(employeeId, payrollYear)
        .then(employee => res.json(employee))
}