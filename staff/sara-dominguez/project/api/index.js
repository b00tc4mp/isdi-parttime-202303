require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { helloApiHandler,
    registerEmployeeHandler,
    authenticateEmployeeHandler,
    retrieveEmployeeHandler,
    retrieveEmployeePayrollDataHandler,
    createEmployeePayrollMonthHandler,
    updateEmployeeAvatarHandler,
    updateEmployeePasswordHandler,
    updateEmployeeAdressHandler,
    updateEmployeeBankAccountNumberHandler,
    retrievePayrollMonthHandler,
    retrieveEmployeePayrollsMonthYearHandler,
    retrievePayrollAnnualAggregateHandler,
    retrieveEmployeesBySalaryLevelHandler,
    retrievePayrollsMonthToBePaidHandler,
    retrieveEmployeePayrollToBePaidHandler,
    updatePayrollStatusToPaidHandler,
} = require('./handlers')


const mongoose = require('mongoose')


mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        const api = express()

        api.use(cors())

        const jsonBodyParser = bodyParser.json()

        api.get('/', helloApiHandler)
        api.get('/employees/retrieve', retrieveEmployeeHandler)
        api.get('/employees/retrieveEmployeePayrollData', retrieveEmployeePayrollDataHandler)
        api.get('/employees/retrieveEmployeePayrollToBePaid/:id', retrieveEmployeePayrollToBePaidHandler)
        api.get('/payrollMonth/retrieveEmployeePayrollMonth/:payrollYear/:payrollMonth', retrievePayrollMonthHandler)
        api.get('/payrollMonth/retrievePayrollsMonthToBePaid/:payrollYear/:payrollMonth', retrievePayrollsMonthToBePaidHandler)
        api.get('/employees/retrieveEmployeesBySalaryLevel/:salaryLevel', retrieveEmployeesBySalaryLevelHandler)
        api.get('/payrollMonth/retrievePayrollAnnualAggregate/:payrollYear', retrievePayrollAnnualAggregateHandler)

        api.post('/employees', jsonBodyParser, registerEmployeeHandler)
        api.post('/employees/auth', jsonBodyParser, authenticateEmployeeHandler)
        api.post('/payrollMonths', jsonBodyParser, createEmployeePayrollMonthHandler)

        api.patch('/employees/updateAvatar', jsonBodyParser, updateEmployeeAvatarHandler)
        api.patch('/employees/updatePassword', jsonBodyParser, updateEmployeePasswordHandler)
        api.patch('/employees/updateAdress', jsonBodyParser, updateEmployeeAdressHandler)
        api.patch('/employees/updateBankAccountNumber', jsonBodyParser, updateEmployeeBankAccountNumberHandler)
        api.patch('/payrollMonths/updatePayrollStatusToPaid', jsonBodyParser, updatePayrollStatusToPaidHandler)

        api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))
    })