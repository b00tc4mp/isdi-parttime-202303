const { retrievePayrollAnnualAggregate } = require('../logic')
const { extractEmployeeId } = require('./helpers')

module.exports = ((req, res,) => {
    const employeeId = extractEmployeeId(req)

    const { payrollYear } = req.params

    return retrievePayrollAnnualAggregate(employeeId, payrollYear)
        .then(employeePayrollAnnualAggregated => res.json(employeePayrollAnnualAggregated))
})