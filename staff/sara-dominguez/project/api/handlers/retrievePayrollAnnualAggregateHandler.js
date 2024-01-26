const { retrievePayrollAnnualAggregate } = require('../logic')
const { extractEmployeeId } = require('./helpers')
const { handleErrors } = require('./helpers')

module.exports = handleErrors((req, res,) => {
    const employeeId = extractEmployeeId(req)

    const { payrollYear } = req.params

    const payrollYearNumber = parseInt(payrollYear)

    const promise = retrievePayrollAnnualAggregate(employeeId, payrollYearNumber)

    return (async () => {
        await promise

            .then(employeePayrollAnnualAggregated => res.json(employeePayrollAnnualAggregated))
    })()
})