const { getMonthNameFromMonthNumber } = require('./helpers')
const { Employee, PayrollMonth } = require('../data/models')
const {
    validators: { validateId, validateName, validateFirstSurname, validateSecondSurname } = require('com'),
    errors: { ExistenceError }
} = require('com')

/**
* Search Employees by name, firstSurname and SecondSurname
* 
* @param {string} employeeLoggedId - employee logged in
* @param {string} name  employee name
* @param {string} firstSurname   employee firstSurname
* @param {string} secondSurname   employee secondSurname
*
* @returns {Promise}  Array of objects with each employee founded
*
@throws {TypeError} On non-string employeeLoggedId, name or firstSurname or secondSurname
* @throws {ContentError} On invalid format name or firstSurname or secondSurname or employeeId doesn't have 24 characters or not hexadecimal
* @throws {RangeError} On name or firstSurname or secondSurname length lower than 3 characters or upper than 15 characterspassword 
* @throws {Existence} On employee not found
*/

module.exports = async (employeeLoggedId, searchPattern) => {
    validateId(employeeLoggedId)

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

        ],
    }, '-__v')

    if (!employees || employees.length === 0) {
        throw new ExistenceError('employee not found')
    }

    employees.sort((a, b) => a.name.localeCompare(b.name))


    return employees
}
