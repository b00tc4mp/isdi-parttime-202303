//TODO handleErrors
const { updateEmployeePassword } = require('../logic')
const { extractEmployeeId } = require('./helpers')

module.exports = (req, res,) => {
    const employeeId = extractEmployeeId(req)

    const { employeePassword, employeeNewPassword, employeeConfirmNewPassword } = req.body

    return updateEmployeePassword(employeeId, employeePassword, employeeNewPassword, employeeConfirmNewPassword)
        .then(() => res.status(204).send())
}