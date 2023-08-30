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
    errors: { ExistenceError, PropertyError, DuplicityError }
} = require('com')

/**
* Update an employee
* 
* @param {string} employeeLoggedId - employee logged in
* @param {string} id - The ID of the employee to update
* @param {string} name  employee name
* @param {string} firstSurname   employee firstSurname
* @param {string} secondSurname   employee secondSurname
//  * @param {date} birthDate   employee birthdate
* @param {string} idCardNumber    employee id card number
* @param {number} tssNumber   employee TGSS number
* @param {string} address   employee personal address
* @param {number} personalPhoneNumber   employee personal phone number
* @param {string} bankAccountNumber   employee accoun bank number
* @param {string} avatar   employee's avatar
//  * @param {date} startOfEmploymentData  Data when employee work relationship started
//  * @param {date} endOfEmploymentData  Data when employee work relationship ends (opciona). Only for temporary contracts )
//  * @param {string} lengthOfEmployment Employuee employment duration
* @param {string} typeOfContract  employee temporary or permanent contract  
* @param {string} jobPosition  employee position
* @param {string} department  employee department
* @param {number} salaryLevel  employee salary scale from 5 (least) to 1 (highest)
* @param {string} centerAttached  Assigned center of the employee
//  * @param {string} superiorHierarchicalManager  Inmediate supervisor of the employee
* @param {string} roll  authorization level of employee's usage profile
* @param {number} professionalPhoneNumber  The employee professional phone number
* @param {string} professionalEmail  The employee professional email.
* @param {string} accessPermissions  current status of employee's permission, authorized ordenied.

*
* @returns {Promise} Ends when employee is updated
*
* @throws {TypeError} On 
*   - non-string employeeLoggedI, dname or firstSurname or secondSurname or idCardNumber or tssNumber or bankAccountNumber or avatar or typeOfContract or jobPosition or department or CenterAttached or roll or accessPermissions or email or password
*   - not a number personalPhoneNumber or employeeNumber or salaryLevel or professionalPhoneNumber
* @throws {ContentError} On:
    - employeeId doesn't have 24 characters or not hexadecimal
*   - empty value or doesnot have 9 characters for personalPhoneNumber or professionalPhoneNumber
*   - empty value avatar or typeOfContract or jobPosition or department or salaryLevel or centerAttached or roll or accessPermissions or email or password
+   does not have a digit or uppercase or lowercase or special characters [-_+/#&] for password
*   - empty value or doesnot have 5 characters for employeeNumber
*   - invalid format name or firstSurname or secondSurname or idCardNumber or tssNumber or avatar or email
*   - invalid value for typeOfContract or jobPosition or department or CenterAttached or roll or acessPermissions
* @throws {RangeError} On:
*   -  name or firstSurname or secondSurname length lower than 3 characters or upper than 15 characterspassword 
*   - non an integer between 1 and 5 salaryLevel 
*   - password length lower than 6 characters or upper than 12
* @throws {Existence} On employee not found
* @throws {PropertyError} On all fields are equal to their current values
* @throws {DuplicityError} On existing employee or params are already asigned to another employee
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
    superiorHierarchicalManager,

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

        if (name === employee.name && firstSurname === employee.firstSurname && secondSurname === employee.secondSurname && idCardNumber === employee.idCardNumber && tssNumber === employee.tssNumber && address === employee.address && personalPhoneNumber === employee.personalPhoneNumber && bankAccountNumber === employee.bankAccountNumber && avatar === employee.avatar && typeOfContract === employee.typeOfContract && jobPosition === employee.jobPosition && department === employee.department && salaryLevel === employee.salaryLevel && centerAttached === employee.centerAttached && superiorHierarchicalManager === employee.superiorHierarchicalManager && roll === employee.roll && professionalPhoneNumber === employee.professionalPhoneNumber && professionalEmail === employee.professionalEmail && accessPermissions === employee.accessPermissions) throw new PropertyError('All fields are equal to their current values')

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
        employee.superiorHierarchicalManager = superiorHierarchicalManager
        employee.roll = roll
        employee.professionalPhoneNumber = professionalPhoneNumber
        employee.professionalEmail = professionalEmail
        employee.accessPermissions = accessPermissions

        return employee.save()
            .catch(error => {
                if (error.message.includes(('E11000')) && error.message.includes('idCardNumber')) {
                    throw new DuplicityError(`Id Card Number: ${idCardNumber} is already assigned to other registered employee.`)
                } else if (error.message.includes(('E11000')) && error.message.includes('tssNumber')) {
                    throw new DuplicityError(`TSS number: ${tssNumber} is already assigned to other registered employee.`)
                } else if (error.message.includes(('E11000')) && error.message.includes('personalPhoneNumber')) {
                    throw new DuplicityError(`Personal phone number: ${personalPhoneNumber} is already assigned to other registered employee.`)
                } else if (error.message.includes(('E11000')) && error.message.includes('professionalEmail')) {
                    throw new DuplicityError(`Professional email: ${professionalEmail} is already assigned to other registered employee.`)
                } else if (error.message.includes(('E11000')) && error.message.includes('professionalPhoneNumber')) {
                    throw new DuplicityError(`Professional phone number: ${professionalPhoneNumber} is already assigned to other registered employee.`)
                } else if (error.message.includes(('E11000')) && error.message.includes('employeeNumber')) {
                    throw new DuplicityError(`Employee number: ${employeeNumber} is already assigned to other registered employee.`)
                }
                throw error
            })
    })()
} 