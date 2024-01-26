const { deletePayrollMonth } = require('../logic')
const { handleErrors, extractEmployeeId } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const employeeId = extractEmployeeId(req)

    const { payrollMonthId } = req.params

    const promise = deletePayrollMonth(employeeId, payrollMonthId)

    return (async () => {
        await promise

            .then(() => res.status(204).send())
    })
})