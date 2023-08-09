const { retrieveEmployeePayrollData } = require('../logic')
const { extractEmployeeId } = require('./helpers')
//TODO helper

module.exports = (req, res) => {
    const employeeId = extractEmployeeId(req)

    return retrieveEmployeePayrollData(employeeId)
        .then(employee => res.json(employee))
}