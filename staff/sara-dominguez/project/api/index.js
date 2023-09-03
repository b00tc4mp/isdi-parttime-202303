require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { helloApiHandler,
    registerEmployeeHandler,
    authenticateEmployeeHandler,
    retrieveEmployeeLoggedHandler,
    retrieveEmployeePayrollDataHandler,
    createEmployeePayrollMonthHandler,
    updateEmployeeHandler,
    updateEmployeeAvatarHandler,
    updateEmployeePasswordHandler,
    updateEmployeeAddressHandler,
    updateEmployeeBankAccountNumberHandler,
    retrievePayrollMonthHandler,
    retrievePayrollAnnualAggregateHandler,
    retrieveEmployeesBySalaryLevelHandler,
    retrievePayrollsMonthToBePaidHandler,
    retrieveEmployeePayrollToBePaidHandler,
    retrieveEmployeeHandler,
    updatePayrollStatusToPaidHandler,
    searchEmployeesHandler,
    getTreeChartHandler,
    resetPasswordHandler,
    deletePayrollMonthHandler
} = require('./handlers')

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        const api = express()

        api.use(cors())

        const jsonBodyParser = bodyParser.json()

        api.get('/', helloApiHandler)
        api.get('/employees/retrieveEmployeeLogged', retrieveEmployeeLoggedHandler)
        api.get('/employees/retrieveEmployeePayrollData', retrieveEmployeePayrollDataHandler)
        api.get('/employees/retrieveEmployeePayrollToBePaid/:id', retrieveEmployeePayrollToBePaidHandler)
        api.get('/employees/retrieveEmployee/:id', retrieveEmployeeHandler)
        api.get('/employees/searchEmployees/:searchPattern', searchEmployeesHandler)
        api.get('/employees/getTreeChart/:searchPattern', getTreeChartHandler)
        api.get('/payrollMonth/retrieveEmployeePayrollMonth/:payrollYear/:payrollMonth', retrievePayrollMonthHandler)
        api.get('/payrollMonth/retrievePayrollsMonthToBePaid/:payrollYear/:payrollMonth', retrievePayrollsMonthToBePaidHandler)
        api.get('/employees/retrieveEmployeesBySalaryLevel/:salaryLevel', retrieveEmployeesBySalaryLevelHandler)
        api.get('/payrollMonth/retrievePayrollAnnualAggregate/:payrollYear', retrievePayrollAnnualAggregateHandler)

        api.post('/employees', jsonBodyParser, registerEmployeeHandler)
        api.post('/employees/auth', jsonBodyParser, authenticateEmployeeHandler)
        api.post('/payrollMonths', jsonBodyParser, createEmployeePayrollMonthHandler)

        api.patch('/employees/updateEmployee', jsonBodyParser, updateEmployeeHandler)
        api.patch('/employees/updateAvatar', jsonBodyParser, updateEmployeeAvatarHandler)
        api.patch('/employees/updatePassword', jsonBodyParser, updateEmployeePasswordHandler)
        api.patch('/employees/updateAddress', jsonBodyParser, updateEmployeeAddressHandler)
        api.patch('/employees/updateBankAccountNumber', jsonBodyParser, updateEmployeeBankAccountNumberHandler)
        api.patch('/payrollMonths/updatePayrollStatusToPaid', jsonBodyParser, updatePayrollStatusToPaidHandler)
        api.patch('/employees/resetPassword', jsonBodyParser, resetPasswordHandler)

        api.delete('/payrollMonths/deletePayrollMonth/:payrollMonthId', jsonBodyParser, deletePayrollMonthHandler)

        api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))
    })