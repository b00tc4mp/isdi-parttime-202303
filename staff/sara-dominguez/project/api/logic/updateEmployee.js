const { Employee } = require('../data/models')
const {
    validators: {
        validateId,
        validateName,
        validateFirstSurname,
        validateSecondSurname,
        validateIdCardNumber,
        validateTssNumber,
        validateAddress,
        validatePersonalPhoneNumber,
        validateBankAccountNumber,
        validateUrl,
        validateTypeOfContract,
        validateJobPosition,
        validateDepartment,
        validateSalaryLevel,
        validateCenterAttached,
        validateRoll,
        validateProfessionalPhoneNumber,
        // validateProfessionalEmail,
        validateAccessPermissions,

    },
    errors: { ExistenceError, PropertyError }
} = require('com')

/**
* Update employee
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

module.exports = function updateEmployee(
    employeeLoggedId,
    id,
    name,
    firstSurname,
    secondSurname,
    // birthDate,
    idCardNumber,
    tssNumber,
    address,
    personalPhoneNumber,
    bankAccountNumber,
    avatar,

    // professionalData:

    // startOfEmploymentData,
    // endOfEmploymentData,
    // lengthOfEmployment,
    typeOfContract,
    jobPosition,
    department,
    salaryLevel,
    centerAttached,
    // superiorHierarchicalManager,

    // permissionsArea:
    roll,
    professionalPhoneNumber,
    professionalEmail,
    accessPermissions,

) {
    validateId(employeeLoggedId)
    validateId(id)
    validateName(name)
    validateFirstSurname(firstSurname)
    validateSecondSurname(secondSurname)
    validateIdCardNumber(idCardNumber)
    validateTssNumber(tssNumber)
    validateAddress(address)
    validatePersonalPhoneNumber(personalPhoneNumber)
    validateBankAccountNumber(bankAccountNumber)
    validateUrl(avatar)
    validateTypeOfContract(typeOfContract)
    validateJobPosition(jobPosition)
    validateDepartment(department)
    validateSalaryLevel(salaryLevel)
    validateCenterAttached(centerAttached)
    validateRoll(roll)
    validateProfessionalPhoneNumber(professionalPhoneNumber)
    // validateProfessionalEmail(professionalEmail)
    validateAccessPermissions(accessPermissions)



    return (async () => {
        const employeeLogged = await Employee.findById(employeeLoggedId)

        if (!employeeLogged) throw new ExistenceError('employee not found')

        const employee = await Employee.findById(id)

        if (!employee) throw new ExistenceError('employee not found')

        if (name === employee.name && firstSurname === employee.firstSurname && secondSurname === employee.secondSurname && idCardNumber === employee.idCardNumber && tssNumber === employee.tssNumber && address === employee.address && personalPhoneNumber === employee.personalPhoneNumber && bankAccountNumber === employee.bankAccountNumber && avatar === employee.avatar && typeOfContract === employee.typeOfContract && jobPosition === employee.jobPosition && department === employee.department && salaryLevel === employee.salaryLevel && centerAttached === employee.centerAttached && roll === employee.roll && professionalPhoneNumber === employee.professionalPhoneNumber && professionalEmail === employee.professionalEmail && accessPermissions === employee.accessPermissions) throw new PropertyError('All fields are equal to their current values')

        employee.name = name
        employee.firstSurname = firstSurname
        employee.secondSurname = secondSurname
        employee.idCardNumber = idCardNumber
        employee.tssNumber = tssNumber
        employee.address = address
        employee.personalPhoneNumber = personalPhoneNumber
        employee.bankAccountNumber = bankAccountNumber
        employee.avatar = avatar
        employee.typeOfContract = typeOfContract
        employee.jobPosition = jobPosition
        employee.department = department
        employee.salaryLevel = salaryLevel
        employee.centerAttached = centerAttached
        employee.roll = roll
        employee.professionalPhoneNumber = professionalPhoneNumber
        employee.professionalEmail = professionalEmail
        employee.accessPermissions = accessPermissions

        return employee.save()
    })()
} 