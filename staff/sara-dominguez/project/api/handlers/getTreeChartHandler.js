const { getTreeChart } = require('../logic')
const { extractEmployeeId } = require('./helpers')
const { handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const employeeLoggedId = extractEmployeeId(req)

    const { searchPattern } = req.params

    const promise = getTreeChart(employeeLoggedId, searchPattern)
    return (async () => {
        await promise

            .then(employees => res.json(employees))
    })()
})