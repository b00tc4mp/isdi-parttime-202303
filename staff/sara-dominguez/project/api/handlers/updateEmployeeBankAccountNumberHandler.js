//TODO handleErrors
const { updateEmployeeBankAccountNumber } = require('../logic')
const { extractEmployeeId } = require('./helpers')
const { handleErrors } = require('./helpers')

module.exports = handleErrors((req, res,) => {
    const employeeId = extractEmployeeId(req)

    const { employeeNewBankAccountNumber } = req.body

    const promise = updateEmployeeBankAccountNumber(employeeId, employeeNewBankAccountNumber)

    return (async () => {
        await promise

        res.status(204).send()
    })()
})