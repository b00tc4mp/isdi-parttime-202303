//TODO handleErrors
const { updateEmployeeBankAccountNumber } = require('../logic')
const { extractEmployeeId } = require('./helpers')

module.exports = (req, res,) => {
    const employeeId = extractEmployeeId(req)

    const { employeeBankAccountNumber, employeeNewBankAccountNumber } = req.body

    return updateEmployeeBankAccountNumber(employeeId, employeeBankAccountNumber, employeeNewBankAccountNumber)
        .then(() => res.status(204).send())
}