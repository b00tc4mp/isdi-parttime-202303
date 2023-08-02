//TODO validators and handle Errors
const { Employee } = require('../data/models')

module.exports = function updateEmployeeBankAccountNumber(employeeId, employeeNewBankAccountNumber) {
    //TODO validators

    // return Employee.findById(employeeId)
    //     .then(employee => {
    //         if (!employee) throw new Error('employee not found')
    //         if (employee.bankAccountNumber === employeeNewBankAccountNumber) throw new Error('new account bank number equals actual account bank number')


    //         return Employee.updateOne({ _id: employee.id }, { $set: { bankAccountNumber: employeeNewBankAccountNumber } })
    //     })

    //     .then(() => { })

    return (async () => {
        try {
            const employee = await Employee.findById(employeeId)
            if (!employee) throw new Error('employee not found')
            if (employee.bankAccountNumber === employeeNewBankAccountNumber) throw new Error('new account bank number equals actual account bank number')

            employee.bankAccountNumber = employeeNewBankAccountNumber

            return Employee.updateOne({ _id: employee.id }, { $set: { bankAccountNumber: employeeNewBankAccountNumber } })
        } catch (error) {
            throw new Error(error.message)
        }
    })()
}