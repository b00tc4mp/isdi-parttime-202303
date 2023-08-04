const { retrievePayrollMonth } = require('../logic')
const { extractEmployeeId } = require('./helpers')
//TODO helper

module.exports = (req, res) => {
    const employeeId = extractEmployeeId(req)

    const { payrollYear, payrollMonth } = req.params

    return retrievePayrollMonth(employeeId, payrollYear, payrollMonth)
        .then(payrollMonthRetrieved => res.json(payrollMonthRetrieved))
}