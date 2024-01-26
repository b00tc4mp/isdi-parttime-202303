const { retrieveEmployee } = require('../logic')
const { extractEmployeeId } = require('./helpers')
const { handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const employeeId = extractEmployeeId(req)

    const { id } = req.params

    const promise = retrieveEmployee(id, employeeId)
    return (async () => {
        await promise

            .then(employee => res.json(employee))
    })()
})