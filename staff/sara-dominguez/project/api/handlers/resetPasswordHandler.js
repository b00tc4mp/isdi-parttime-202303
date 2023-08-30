const { resetPassword } = require('../logic')
const { extractEmployeeId } = require('./helpers')
const { handleErrors } = require('./helpers')

module.exports = handleErrors((req, res,) => {
    const employeeLoggedId = extractEmployeeId(req)

    const { employeeNumber } = req.body

    const promise = resetPassword(employeeLoggedId, employeeNumber)

    return (async () => {
        await promise

        res.status(204).send()
    })()
})