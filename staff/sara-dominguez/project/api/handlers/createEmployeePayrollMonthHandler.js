const { createEmployeePayrollMonth } = require('../logic')
//TODO handle errors

module.exports = (req, res) => {
    const { employeeId, payrollYear, payrollMonth } = req.body

    const payrollYearNumber = parseInt(payrollYear)
    const payrollMonthNumber = parseInt(payrollMonth)

    return createEmployeePayrollMonth(employeeId, payrollYearNumber, payrollMonthNumber)
        .then(() => res.status(201).send())

}