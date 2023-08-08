const { retrievePayrollAnnualAggregate } = require('../logic')
const { extractEmployeeId } = require('./helpers')

module.exports = ((req, res,) => {
    const employeeId = extractEmployeeId(req)

    const { payrollYear } = req.params

    const payrollYearIsoDate = new Date(payrollYear).toISOString()


    return retrievePayrollAnnualAggregate(employeeId, payrollYearIsoDate)
        .then(employeePayrollAnnualAggregated => res.json(employeePayrollAnnualAggregated))
})