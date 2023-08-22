const { Employee } = require('../data/models')
const {
    validators: { validateId, validateAddress },
    errors: { ExistenceError, PropertyError }
} = require('com')

/**
* Update an employee's address in the database.
*
* @param {string} employeeId - The ID of the employee to update.
* @param {string} employeeStreet - The new street address of the employee.
* @param {string} employeePostalCode - The new postal code of the employee's address.
* @param {string} employeeCity - The new city of the employee's address.
* @param {string} employeeCountry - The new country of the employee's address.
* 
* @returns {Promise} A promise that resolves to the result of updating the employee's address.
* 
* @throws {TypeError} On non-string employeeId or employeeNewAddress
* @throws {ContentError} On employeeId doesn't have 24 characters or not hexadecimal or invalid format for employeeNewAddress
* @throws {ExistenceError} Throws an error if the specified employee is not found in the database.
* @throws {PropertyError} Throws an error if the new address is the same as the current address.
*/

module.exports = function updateEmployeeAdress(employeeId, employeeStreet, employeePostalCode, employeeCity, employeeCountry) {
    validateId(employeeId)

    const employeeNewAddress = `${employeeStreet}` + ' ' + `${employeePostalCode}` + ' ' + `${employeeCity}` + ' ' + `${employeeCountry}`
    validateAddress(employeeNewAddress)

    return (async () => {
        const employee = await Employee.findById(employeeId)

        if (!employee) throw new ExistenceError('employee not found')

        if (employeeNewAddress === employee.address) throw new PropertyError('new address equals actual address')

        return Employee.updateOne({ _id: employee.id }, { $set: { address: employeeNewAddress } })
    })()
} 
