const { retrieveEmployeePayrollsMonthYear } = require('../logic')
const { extractEmployeeId } = require('./helpers')
const { handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const employeeId = extractEmployeeId(req)

    const { payrollYear } = req.params

    const promise = retrieveEmployeePayrollsMonthYear(employeeId, payrollYear)

    return (async () => {
        await promise

            .then(employee => res.json(employee))
    })
})