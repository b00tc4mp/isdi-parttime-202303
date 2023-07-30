const { retrievePayrollMonth } = require('../logic')
const { extractEmployeeId } = require('./helpers')
//TODO helper

module.exports = (req, res) => {
    const employeeId = extractEmployeeId(req)

    const { payrollYear, payrollMonth } = req.params

    const payrollYearIsoDate = new Date(payrollYear)

    return retrievePayrollMonth(employeeId, payrollYearIsoDate, payrollMonth)
        .then(employee => res.json(employee))
}