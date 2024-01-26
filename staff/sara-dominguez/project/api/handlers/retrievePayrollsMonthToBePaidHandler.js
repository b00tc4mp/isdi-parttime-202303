const { retrievePayrollsMonthToBePaid } = require('../logic')
const { extractEmployeeId } = require('./helpers')
const { handleErrors } = require('./helpers')


module.exports = handleErrors((req, res) => {
    const employeeId = extractEmployeeId(req)

    const { payrollYear, payrollMonth } = req.params

    const payrollYearNumber = parseInt(payrollYear)
    const payrollMonthNumber = parseInt(payrollMonth)

    const promise = retrievePayrollsMonthToBePaid(employeeId, payrollYearNumber, payrollMonthNumber)

    return (async () => {
        await promise

            .then(payrollMonthRetrieved => res.json(payrollMonthRetrieved))
    })()
})