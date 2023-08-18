const { handleErrors } = require('./helpers')
const { updatePayrollStatusToPaid } = require('../logic')
const { extractEmployeeId } = require('./helpers')

module.exports = handleErrors((req, res,) => {
    const employeeId = extractEmployeeId(req)

    const { _id } = req.body

    const promise = updatePayrollStatusToPaid(employeeId, _id)

    return (async () => {
        await promise

        res.status(204).send()
    })()
})