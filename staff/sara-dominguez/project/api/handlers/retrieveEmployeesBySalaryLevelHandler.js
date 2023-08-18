const { retrieveEmployeesBySalaryLevel } = require('../logic')
const { extractEmployeeId } = require('./helpers')
const { handleErrors } = require('./helpers')
//TODO helper

module.exports = handleErrors((req, res) => {
    const employeeId = extractEmployeeId(req)

    const { salaryLevel } = req.params

    const salaryLevelNumber = parseInt(salaryLevel)

    const promise = retrieveEmployeesBySalaryLevel(employeeId, salaryLevelNumber)

    return (async () => {
        await promise

            .then((employeeListRetrieved) => res.json(employeeListRetrieved))
    })()
})