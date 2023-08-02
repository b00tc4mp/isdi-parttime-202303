const { retrieveEmployeesBySalaryLevel } = require('../logic')
const { extractEmployeeId } = require('./helpers')
//TODO helper

module.exports = (req, res) => {
    // const employeeId = extractEmployeeId(req)

    const { salaryLevel } = req.params

    return retrieveEmployeesBySalaryLevel(salaryLevel)
        .then((employeeListRetrieved) => res.json(employeeListRetrieved))
}