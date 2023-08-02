//TODO handleErrors
const { updateEmployeeBankAccountNumber } = require('../logic')
const { extractEmployeeId } = require('./helpers')

module.exports = (req, res,) => {
    const employeeId = extractEmployeeId(req)

    const { employeeNewBankAccountNumber } = req.body

    return updateEmployeeBankAccountNumber(employeeId, employeeNewBankAccountNumber)
        .then(() => res.status(204).send())
}