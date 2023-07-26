module.exports = {
    helloApiHandler: require('./helloApiHandler'),
    registerEmployeeHandler: require('./registerEmployeeHandler'),
    authenticateEmployeeHandler: require('./authenticateEmployeeHandler'),
    retrieveEmployeeHandler: require('./retrieveEmployeeHandler'),
    createEmployeeMonthPayrollHandler: require('./createEmployeeMonthPayrollHandler'),
    updateEmployeeAvatarHandler: require('./updateEmployeeAvatarHandler'),
    updateEmployeePasswordHandler: require('./updateEmployeePasswordHandler'),
    updateEmployeeBankAccountNumberHandler: require('./updateEmployeeBankAccountNumberHandler'),
    retrievePayrollMonthHandler: require('./retrievePayrollMonthHandler'),
    isEmployeeAccessPermissionsAuthorizedHandler: require('./isEmployeeAccessPermissionsAuthorizedHandler'),
    // retrieveEmployeesBySalaryLevelHandler: require('./retrieveEmployeesBySalaryLevelHandler'),
    retrieveEmployeePayrollsMonthHandler: require('./retrieveEmployeePayrollsMonthHandler')
}