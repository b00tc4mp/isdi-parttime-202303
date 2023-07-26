const { retrievePayrollMonth } = require('../logic')
const { extractEmployeeId } = require('./helpers')
//TODO helper

module.exports = (req, res) => {
    const employeeId = extractEmployeeId(req)

    const { payrollYear, payrollMonth } = req.body

    return retrievePayrollMonth(employeeId, payrollYear, payrollMonth)
        .then(employee => res.json(employee))
}