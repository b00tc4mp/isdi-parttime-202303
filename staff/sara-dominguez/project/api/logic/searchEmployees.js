const { getMonthNameFromMonthNumber } = require('./helpers')
const { Employee, PayrollMonth } = require('../data/models')
const {
    validators: { validateId, validateSearchPattern } = require('com'),
    errors: { ExistenceError }
} = require('com')

/**
* Search Employees by searchPattern
* 
* @param {string} employeeLoggedId - employee logged in
* @param {string} searchPattern  A string with the desired search criteria
*
* @returns {Promise}  Array of objects with each employee founded
*
* @throws {TypeError} On non-string employeeLoggedId or searchPattern
* @throws {ContentError} On employeeId doesn't have 24 characters or not hexadecimal or searchPattern is empty
* @throws {Existence} On employee not found
*/

module.exports = async (employeeLoggedId, searchPattern) => {
    validateId(employeeLoggedId)
    validateSearchPattern(searchPattern)

    const employee = await Employee.findById(employeeLoggedId).lean()

    if (!employee) {
        throw new ExistenceError(`User with id ${employeeLoggedId} not found`)
    }

    const employees = await Employee.find({
        $or: [
            { name: { $regex: searchPattern, $options: 'i' } },
            { firstSurname: { $regex: searchPattern, $options: 'i' } },
            { secondSurname: { $regex: searchPattern, $options: 'i' } },
            { idCardNumber: { $regex: searchPattern, $options: 'i' } },
            { tssNumber: { $regex: searchPattern, $options: 'i' } },
            { address: { $regex: searchPattern, $options: 'i' } },
            { typeOfContract: { $regex: searchPattern, $options: 'i' } },
            { jobPosition: { $regex: searchPattern, $options: 'i' } },
            { department: { $regex: searchPattern, $options: 'i' } },
            { centerAttached: { $regex: searchPattern, $options: 'i' } },
            { roll: { $regex: searchPattern, $options: 'i' } },
            { professionalEmail: { $regex: searchPattern, $options: 'i' } },
            { accessPermissions: { $regex: searchPattern, $options: 'i' } },
            { employeeNumber: { $regex: searchPattern, $options: 'i' } },

        ],
    }, '-__v -employeePassword -employeePasswordToChange')

    if (!employees || employees.length === 0) {
        throw new ExistenceError('employee not found')
    }

    const employeeListOrdered = employees.sort((a, b) => {
        const nameComparison = a.name.localeCompare(b.name)
        if (nameComparison !== 0) return nameComparison

        const firstNameComparison = a.firstSurname.localeCompare(b.firstSurname)
        if (firstNameComparison !== 0) return firstNameComparison

        const secondNameComparison = a.secondSurname.localeCompare(b.secondSurname)
        return secondNameComparison
    })
    return employeeListOrdered
}
