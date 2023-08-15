module.exports = {
    helloApiHandler: require('./helloApiHandler'),
    registerEmployeeHandler: require('./registerEmployeeHandler'),
    authenticateEmployeeHandler: require('./authenticateEmployeeHandler'),
    retrieveEmployeeHandler: require('./retrieveEmployeeHandler'),
    retrieveEmployeePayrollDataHandler: require('./retrieveEmployeePayrollDataHandler'),
    createEmployeePayrollMonthHandler: require('./createEmployeePayrollMonthHandler'),
    updateEmployeeAvatarHandler: require('./updateEmployeeAvatarHandler'),
    updateEmployeePasswordHandler: require('./updateEmployeePasswordHandler'),
    updateEmployeeAdressHandler: require('./updateEmployeeAdressHandler'),
    updateEmployeeBankAccountNumberHandler: require('./updateEmployeeBankAccountNumberHandler'),
    retrievePayrollMonthHandler: require('./retrievePayrollMonthHandler'),
    retrieveEmployeesBySalaryLevelHandler: require('./retrieveEmployeesBySalaryLevelHandler'),
    // retrieveEmployeePayrollsMonthYearHandler: require('./retrieveEmployeePayrollsMonthYearHandler'),
    retrievePayrollAnnualAggregateHandler: require('./retrievePayrollAnnualAggregateHandler'),
    retrievePayrollsMonthToBePaidHandler: require('./retrievePayrollsMonthToBePaidHandler'),
    retrieveEmployeePayrollToBePaidHandler: require('./retrieveEmployeePayrollToBePaidHandler'),
    updatePayrollStatusToPaidHandler: require('./updatePayrollStatusToPaidHandler')


}