const { updateEmployeePassword } = require('../logic')
const { extractEmployeeId } = require('./helpers')
const { handleErrors } = require('./helpers')

module.exports = handleErrors((req, res,) => {
    const employeeId = extractEmployeeId(req)

    const { employeePassword, employeeNewPassword, employeeConfirmNewPassword } = req.body

    const promise = updateEmployeePassword(employeeId, employeePassword, employeeNewPassword, employeeConfirmNewPassword)

    return (async () => {
        await promise

        res.status(204).send()
    })()
})