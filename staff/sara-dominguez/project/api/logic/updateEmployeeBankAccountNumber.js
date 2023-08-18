const { Employee } = require('../data/models')
const { validators: { validateId, validateBankAccountNumber },
    errors: { ExistenceError, PropertyError }
} = require('com')

/**
* Update employee bank account number
* 
* @param {string} employeeId  The employee id number
* @param {string} employeeBankAccountNumber  new bank account number for the employee
* 
* @returns {Promise<void>} Ends when employee bank account number is updated
* 
* @throws {TypeError} On non-string employeeId or employeeNewBankAccountNumber
* @throws {ContentError} On employeeId doesn't have 24 characters or not hexadecimal or non-24 characters BankAccountNumber
* @throws {ExistenceError} On non-existing employee
* @throws {propertyError} On non-different value between actual employeeBankAccountNumber and employeeNewBankAccountNumber
*/


module.exports = function updateEmployeeBankAccountNumber(employeeId, employeeNewBankAccountNumber) {
    validateId(employeeId)
    validateBankAccountNumber(employeeNewBankAccountNumber)

    return (async () => {
        const employee = await Employee.findById(employeeId)
        if (!employee) throw new ExistenceError('employee not found')
        if (employee.bankAccountNumber === employeeNewBankAccountNumber) throw new PropertyError('new account bank number equals actual account bank number')

        employee.bankAccountNumber = employeeNewBankAccountNumber

        await Employee.updateOne({ _id: employee.id }, { $set: { bankAccountNumber: employeeNewBankAccountNumber } })
    })()
}