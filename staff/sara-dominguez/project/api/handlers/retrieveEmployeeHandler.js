const { retrieveEmployee } = require('../logic')
const { extractEmployeeId } = require('./helpers')
//TODO helper

module.exports = (req, res) => {
    const employeeId = extractEmployeeId(req)

    return retrieveEmployee(employeeId)
        .then(employee => res.json(employee))
}