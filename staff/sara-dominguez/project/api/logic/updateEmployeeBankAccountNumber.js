//TODO validators and handle Errors
const { Employee } = require('../data/models')
const { validators: { validateId, validateBankAccountNumber } } = require('com')

/**
 * Update bank account number of an employee
 * 
* @param {string} employeeId  The employee id number
* @param {string} employeeBankAccountNumber  new bank account number for the employee
* 
* @returns {Promise<void>} Ends when employee bank account number is updated
//  * 
//  * @throws {TypeError} On non-string bankAccountNumber
//  * @throws {ContentError} On non-24 characters BankAccountNumber
//  * @throws {ExistenceError} On non-existing employee

*/
module.exports = function updateEmployeeBankAccountNumber(employeeId, employeeNewBankAccountNumber) {
    validateId(employeeId)
    validateBankAccountNumber(employeeNewBankAccountNumber)

    return (async () => {
        try {
            const employee = await Employee.findById(employeeId)
            if (!employee) throw new Error('employee not found')
            if (employee.bankAccountNumber === employeeNewBankAccountNumber) throw new Error('new account bank number equals actual account bank number')

            employee.bankAccountNumber = employeeNewBankAccountNumber

            await Employee.updateOne({ _id: employee.id }, { $set: { bankAccountNumber: employeeNewBankAccountNumber } })
        } catch (error) {
            throw new Error(error.message)
        }
    })()
}