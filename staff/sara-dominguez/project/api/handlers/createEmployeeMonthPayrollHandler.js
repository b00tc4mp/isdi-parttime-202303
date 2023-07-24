const { createEmployeeMonthPayroll } = require('../logic')
//TODO handle errors

module.exports = (req, res) => {
    const { employeeNumber, payrollMonthYear, payrollMonth } = req.body

    return createEmployeeMonthPayroll(employeeNumber, payrollMonthYear, payrollMonth)
        .then(() => res.status(201).send())

}