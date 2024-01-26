const { createEmployeePayrollMonth } = require('../logic')
const { extractEmployeeId } = require('./helpers')
const { handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const employeeLoggedId = extractEmployeeId(req)
    const { employeeId, payrollYear, payrollMonth } = req.body

    const payrollYearNumber = parseInt(payrollYear)
    const payrollMonthNumber = parseInt(payrollMonth)

    const promise = createEmployeePayrollMonth(employeeLoggedId, employeeId, payrollYearNumber, payrollMonthNumber)

    return (async () => {
        await promise

            .then(() => res.status(201).send())
    })()

})