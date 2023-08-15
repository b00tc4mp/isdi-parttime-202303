//TODO validators and handle Errors
const { Employee } = require('../data/models')
const { validators: { validateId } } = require('com')

module.exports = function updateEmployeePassword(employeeId, employeeStreet, employeePostalCode, employeeCity, employeeCountry) {
    validateId(employeeId)
    //TODO validateAdress

    return (async () => {
        try {
            const employee = await Employee.findById(employeeId)
            if (!employee) throw new Error('employee not found')

            const employeeNewAdress = `${employeeStreet}` + ' ' + `${employeePostalCode}` + ' ' + `${employeeCity}` + ' ' + `${employeeCountry}`

            if (employeeNewAdress === employee.adress) throw new Error('new adress equals actual adress')

            return Employee.updateOne({ _id: employee.id }, { $set: { adress: employeeNewAdress } })
        } catch (error) {
            throw new Error(error.message)
        }
    })()
} 
