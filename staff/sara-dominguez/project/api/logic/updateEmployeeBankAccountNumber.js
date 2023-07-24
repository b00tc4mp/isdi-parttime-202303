//TODO validators and handle Errors
const { Employee } = require('../data/models')

module.exports = function updateEmployeeBankAccountNumber(employeeId, employeeBankAccountNumber, employeeNewBankAccountNumber) {
    // validators
    debugger
    return Employee.findById(employeeId)
        .then(employee => {
            if (!employee) throw new Error('employee not found')
            if (employeeBankAccountNumber === employeeNewBankAccountNumber) throw new Error('new account bank number equals actual account bank number')


            return Employee.updateOne({ _id: employee.id }, { $set: { bankAccountNumber: employeeNewBankAccountNumber } })
        })

        .then(() => { })
}