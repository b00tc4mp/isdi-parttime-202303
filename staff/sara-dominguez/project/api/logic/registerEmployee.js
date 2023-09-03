const {
    validators: {
        validateName,
        validateFirstSurname,
        validateSecondSurname,
        validateIdCardNumber,
        validateTssNumber,
        validateAddress,
        validatePersonalPhoneNumber,
        validateBankAccountNumber,
        validateUrl,
        // validateEmployeeNumber,
        validateTypeOfContract,
        validateJobPosition,
        validateDepartment,
        validateSalaryLevel,
        validateCenterAttached,
        validateRoll,
        validateProfessionalPhoneNumber,
        validateEmail,
        validateAccessPermissions,
    },
    errors: { DuplicityError, AuthError }
} = require('com')
const { Employee } = require('../data/models')



/**
* Register an employee
* 
* @param {string} employeeLoggedId employee logged id  
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
* @param {number} employeeNumber   employee company credential: id number
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
* @param {string} employeePassword  employee password
*
* @returns {Promise} Ends when employee is registered
*
* @throws {TypeError} On 
*   - non-string name or firstSurname or secondSurname or idCardNumber or tssNumber or bankAccountNumber or avatar or typeOfContract or jobPosition or department or CenterAttached or roll or accessPermissions or email or password
*   - not a number personalPhoneNumber or employeeNumber or salaryLevel or professionalPhoneNumber
* @throws {ContentError} On:
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
* @throws {DuplicityError} On existing employee or params are already asigned to another employee
*/

module.exports = function registerEmployee(
    employeeLoggedId,
    name,
    firstSurname,
    secondSurname,
    idCardNumber,
    tssNumber,
    address,
    personalPhoneNumber,
    bankAccountNumber,
    avatar,

    // professionalData:
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
    validateEmail(professionalEmail)
    validateAccessPermissions(accessPermissions)

    return (async () => {


        const employeeLoggedInId = await Employee.findById(employeeLoggedId)

        if (!employeeLoggedInId) throw new ExistenceError('employeeLoggedId not found')

        if (employeeLoggedInId.accessPermissions !== "Authorized") throw new AuthError("You don't have permission to continue, please contact HR (Human Resources)")

        const employees = await Employee.find({})
        let employeeNumber = 10000 + (employees.length + 1)

        const employeePassword = `Be-${employeeNumber}`

        try {
            await Employee.create({
                name,
                firstSurname,
                secondSurname,
                idCardNumber,
                tssNumber,
                address,
                personalPhoneNumber,
                bankAccountNumber,
                avatar,

                // professionalData:
                employeeNumber,
                typeOfContract,
                jobPosition,
                department,
                salaryLevel,
                centerAttached,
                superiorHierarchicalManager,

                // // permissionsArea:
                roll,
                professionalPhoneNumber,
                professionalEmail,
                accessPermissions,
                employeePassword,
            })
        } catch (error) {
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
        }
    })()
}