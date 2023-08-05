require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { helloApiHandler,
    registerEmployeeHandler,
    authenticateEmployeeHandler,
    retrieveEmployeeHandler,
    createEmployeePayrollMonthHandler,
    updateEmployeeAvatarHandler,
    updateEmployeePasswordHandler,
    updateEmployeeAdressHandler,
    updateEmployeeBankAccountNumberHandler,
    retrievePayrollMonthHandler,
    retrieveEmployeePayrollsMonthYearHandler,
    retrievePayrollAnnualAggregateHandler,
    retrieveEmployeesBySalaryLevelHandler
} = require('./handlers')


const mongoose = require('mongoose')


mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        const api = express()

        api.use(cors())

        const jsonBodyParser = bodyParser.json()

        api.get('/', helloApiHandler)
        api.get('/employees/retrieve', retrieveEmployeeHandler)
        // api.get('/employees/accessPermissionsAuthorized', isEmpoyeeAccessPermissionsAuthorizedHandler)
        api.get('/payrollMonth/retrieveEmployeePayrollMonth/:payrollYear/:payrollMonth', retrievePayrollMonthHandler)
        api.get('/payrollMonth/retrieveEmployeePayrollsMonthYear/:payrollYear', retrieveEmployeePayrollsMonthYearHandler)
        api.get('/employees/retrieveEmployeesBySalaryLevel/:salaryLevel', retrieveEmployeesBySalaryLevelHandler)
        api.get('/payrollMonth/retrievePayrollAnnualAggregate/:payrollYear', retrievePayrollAnnualAggregateHandler)






        api.post('/employees', jsonBodyParser, registerEmployeeHandler)
        api.post('/employees/auth', jsonBodyParser, authenticateEmployeeHandler)
        api.post('/payrollMonths', jsonBodyParser, createEmployeePayrollMonthHandler)

        api.patch('/employees/updateAvatar', jsonBodyParser, updateEmployeeAvatarHandler)
        api.patch('/employees/updatePassword', jsonBodyParser, updateEmployeePasswordHandler)
        api.patch('/employees/updateAdress', jsonBodyParser, updateEmployeeAdressHandler)
        api.patch('/employees/updateBankAccountNumber', jsonBodyParser, updateEmployeeBankAccountNumberHandler)


        api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))
    })