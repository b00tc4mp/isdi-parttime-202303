const { retrieveEmployeePayrollToBePaid } = require('../logic')
const { extractEmployeeId } = require('./helpers')
//TODO helper

module.exports = (req, res) => {
    const employeeId = extractEmployeeId(req)

    const { id } = req.params

    return retrieveEmployeePayrollToBePaid(id, employeeId)
        .then(employee => res.json(employee))
}