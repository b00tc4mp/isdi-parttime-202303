const { getMonthNameFromMonthNumber } = require('./helpers')
const { Employee, PayrollMonth } = require('../data/models')
const {
    validators: { validateId, validateName, validateFirstSurname, validateSecondSurname } = require('com'),
    errors: { ExistenceError }
} = require('com')

/**
* Retrieve payroll month to be paid
* 
* @param {string} employeeId  The employee id
* @param {number} payrollYear  The payroll's year to retrieve
* @param {number} payrollMonth  The payroll's month to retrieve
*
* @returns {Promise}  Object with payrolls data for a year and month to process
*
* @throws {TypeError} On non-string employeeId or non-number payrollYear or payrollMonth 
* @throws {ContentError} On employeeId is not hexadecimal or doesn't have 24 characters or payrollYear or payrlollMonth are empty
* @throws {RangeError} On non-integer payrollyear or non-integer between 1 and 12 payrollMonth
* @throws {ExistenceError} On non-existing employee
 */

module.exports = async (employeeLoggedId, name, firstSurname, secondSurname) => {
    validateId(employeeLoggedId)
    validateName(name)
    validateFirstSurname(firstSurname)
    validateSecondSurname(secondSurname)

    const employee = await Employee.findById(employeeLoggedId).lean()

    if (!employee) {
        throw new ExistenceError(`User with id ${employeeLoggedId} not found`)
    }

    const searchConditions = []

    if (name) {
        searchConditions.push({ name: { $regex: name, $options: 'i' } })
    }
    if (firstSurname) {
        searchConditions.push({ firstSurname: { $regex: firstSurname, $options: 'i' } })
    }
    if (secondSurname) {
        searchConditions.push({ secondSurname: { $regex: secondSurname, $options: 'i' } })
    }

    const employees = await Employee.find({
        $or: searchConditions
    })
    if (!employees || employees.length === 0) {
        throw new ExistenceError('Payrolls not found')
    }

    return employees
}