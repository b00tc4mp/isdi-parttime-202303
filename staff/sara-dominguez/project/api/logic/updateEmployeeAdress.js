//TODO validators and handle Errors
const { Employee } = require('../data/models')

module.exports = function updateEmployeePassword(employeeId, employeeStreet, employeePostalCode, employeeCity, employeeCountry) {
    // validators

    return Employee.findById(employeeId)
        .then(employee => {
            if (!employee) throw new Error('employee not found')

            const employeeNewAdress = `${employeeStreet}` + ' ' + `${employeePostalCode}` + ' ' + `${employeeCity}` + ' ' + `${employeeCountry}`

            if (employeeNewAdress === employee.adress) throw new Error('new adress equals actual adress')


            return Employee.updateOne({ _id: employee.id }, { $set: { adress: employeeNewAdress } })
        })

        .then(() => { })
}