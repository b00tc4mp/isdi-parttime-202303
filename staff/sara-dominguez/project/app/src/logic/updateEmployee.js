import { validators, errors } from 'com'
import context from './context'
const {
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
    validateEmail,
    validateAccessPermissions,
} = validators


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


export default function updateEmployee(
    id,
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
    validateEmail(professionalEmail)
    validateAccessPermissions(accessPermissions)


    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/employees/updateEmployee`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${context.token}`
            },
            body: JSON.stringify({
                id,
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
            })
        })
        if (res.status === 204) {
            return
        } else {
            const { type, message } = await res.json()

            const clazz = errors[type]

            throw new clazz(message)
        }
    })()
}