//TODO handleErrors
const { updatePayrollStatusToPaid } = require('../logic')
const { extractEmployeeId } = require('./helpers')

module.exports = (req, res,) => {
    const employeeId = extractEmployeeId(req)

    const { _id } = req.body

    return updatePayrollStatusToPaid(employeeId, _id)
        .then(() => res.status(204).send())
}