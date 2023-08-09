const { retrievePayrollAnnualAggregate } = require('../logic')
const { extractEmployeeId } = require('./helpers')

module.exports = ((req, res,) => {
    const employeeId = extractEmployeeId(req)

    const { payrollYear } = req.params

    const payrollYearNumber = parseInt(payrollYear)

    return retrievePayrollAnnualAggregate(employeeId, payrollYearNumber)
        .then(employeePayrollAnnualAggregated => res.json(employeePayrollAnnualAggregated))
})