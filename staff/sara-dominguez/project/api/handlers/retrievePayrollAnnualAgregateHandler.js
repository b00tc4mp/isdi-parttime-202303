const { retrievePayrollAnnualAgregate } = require('../logic')
const { extractEmployeeId } = require('./helpers')

module.exports = ((req, res,) => {
    const employeeId = extractEmployeeId(req)

    const { payrollYear } = req.body

    return retrievePayrollAnnualAgregate(employeeId, payrollYear)
        .then(console.log)
        .then(() => res.status(204).send())
})