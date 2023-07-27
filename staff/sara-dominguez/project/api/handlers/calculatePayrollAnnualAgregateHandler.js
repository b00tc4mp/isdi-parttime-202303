const { updateEmployeeAvatar } = require('../logic')
const { extractEmployeeId } = require('./helpers')

module.exports = (req, res,) => {
    const employeeId = extractEmployeeId(req)

    const { } = req.body

    return calculatePayrollAnnualAgregate(employeeId, avatar)
        .then(() => res.status(204).send())
}