const { createEmployeePayrollMonth } = require('../logic')
const { handleErrors } = require('./helpers')

// module.exports = (req, res) => {
//     const { employeeId, payrollYear, payrollMonth } = req.body

//     const payrollYearNumber = parseInt(payrollYear)
//     const payrollMonthNumber = parseInt(payrollMonth)

//     return createEmployeePayrollMonth(employeeId, payrollYearNumber, payrollMonthNumber)
//         .then(() => res.status(201).send())

module.exports = handleErrors((req, res) => {
    const { employeeId, payrollYear, payrollMonth } = req.body

    const payrollYearNumber = parseInt(payrollYear)
    const payrollMonthNumber = parseInt(payrollMonth)

    const promise = createEmployeePayrollMonth(employeeId, payrollYearNumber, payrollMonthNumber)

    return (async () => {
        await promise

            .then(() => res.status(201).send())
    })()

})