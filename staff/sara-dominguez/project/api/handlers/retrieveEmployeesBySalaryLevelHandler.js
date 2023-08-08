const { retrieveEmployeesBySalaryLevel } = require('../logic')
const { extractEmployeeId } = require('./helpers')
//TODO helper

module.exports = (req, res) => {
    const employeeId = extractEmployeeId(req)

    const { salaryLevel } = req.params

    const salaryLevelNumber = parseInt(salaryLevel)

    return retrieveEmployeesBySalaryLevel(employeeId, salaryLevelNumber)
        .then((employeeListRetrieved) => res.json(employeeListRetrieved))
}