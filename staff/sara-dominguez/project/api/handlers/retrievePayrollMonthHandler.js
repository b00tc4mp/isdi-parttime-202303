const { retrievePayrollMonth } = require('../logic')
const { extractEmployeeId } = require('./helpers')
//TODO helper

module.exports = (req, res) => {
    const employeeId = extractEmployeeId(req)

    const { payrollYear, payrollMonth } = req.params

    const payrollYearNumber = parseInt(payrollYear)
    const payrollMonthNumber = parseInt(payrollMonth)

    return retrievePayrollMonth(employeeId, payrollYearNumber, payrollMonthNumber)
        .then(payrollMonthRetrieved => res.json(payrollMonthRetrieved))
}