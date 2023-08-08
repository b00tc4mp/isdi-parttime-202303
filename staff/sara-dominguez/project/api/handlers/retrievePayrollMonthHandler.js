const { retrievePayrollMonth } = require('../logic')
const { extractEmployeeId } = require('./helpers')
//TODO helper

module.exports = (req, res) => {
    const employeeId = extractEmployeeId(req)

    const { payrollYear, payrollMonth } = req.params

    const payrollYearIsoDate = new Date(payrollYear).toISOString()

    const payrollMonthNumber = parseInt(payrollMonth)

    return retrievePayrollMonth(employeeId, payrollYearIsoDate, payrollMonthNumber)
        .then(payrollMonthRetrieved => res.json(payrollMonthRetrieved))
}