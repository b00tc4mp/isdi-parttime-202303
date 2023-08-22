
import { validators } from 'com'
const {
    validateName,
    validateFirstSurname,
    validateSecondSurname,
    validateIdCardNumber,
    validateTssNumber,
    validateAddress,
    validatePersonalPhoneNumber, validateBankAccountNumber,
    validateUrl,
    validateEmployeeNumber,
    validateTypeOfContract,
    validateJobPosition,
    validateDepartment,
    validateCenterAttached,
    validateRoll,
    validateProfessionalPhoneNumber, validateAccessPermissions, validateEmployeePassword
} = validators

/**
* Register an employee
* 
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
*   - non-string name or firstSurname or secondSurname or idCardNumber or tssNumber or address or bankAccountNumber or avatar or typeOfContract or jobPosition or department or CenterAttached or roll or accessPermissions or email or password
*   - not a number personalPhoneNumber or employeeNumber or salaryLevel or professionalPhoneNumber
* @throws {ContentError} On:
*   - empty value or doesnot have 9 characters for personalPhoneNumber or professionalPhoneNumber
*   - empty value avatar or typeOfContract or jobPosition or department or salaryLevel or centerAttached or roll or accessPermissions or email or password
+   does not have a digit or uppercase or lowercase or special characters [-_+/#&] for password
*   - empty value or doesnot have 5 characters for employeeNumber
*   - invalid format name or firstSurname or secondSurname or idCardNumber or tssNumber or address or avatar or email
*   - invalid value for typeOfContract or jobPosition or department or CenterAttached or roll or acessPermissions
* @throws {RangeError} On:
*   -  name or firstSurname or secondSurname length lower than 3 characters or upper than 15 characterspassword 
*   - non an integer between 1 and 5 salaryLevel 
*   - password length lower than 6 characters or upper than 12
// //  * @throws {ExistenceError} On non-existing user
// //  * @throws {AuthError} On wrong credentials
*/


export default (name,
    firstSurname,
    secondSurname,
    // birthDate,
    idCardNumber,
    tssNumber,
    address,
    personalPhoneNumber,
    bankAccountNumber,
    avatar,
    employeeNumber,
    // startOfEmploymentData,
    // endOfEmploymentData,
    // lengthOfEmployment,
    typeOfContract,
    jobPosition,
    department,
    salaryLevel,
    centerAttached,
    // superiorHierachicalManager,
    roll,
    professionalPhoneNumber,
    professionalEmail,
    accessPermissions,
    employeePassword
) => {

    validateName(name)
    validateFirstSurname(firstSurname)
    validateSecondSurname(secondSurname)
    validateIdCardNumber(idCardNumber)
    validateTssNumber(tssNumber)
    validateAddress(address)
    validatePersonalPhoneNumber(personalPhoneNumber)
    validateBankAccountNumber(bankAccountNumber)
    validateUrl(avatar)
    validateEmployeeNumber(employeeNumber)
    validateTypeOfContract(typeOfContract)
    validateJobPosition(jobPosition)
    validateDepartment(department)
    validateCenterAttached(centerAttached)
    validateRoll(roll)
    validateProfessionalPhoneNumber(professionalPhoneNumber)
    validateAccessPermissions(accessPermissions)
    validateEmployeePassword(employeePassword)

    return fetch(`${import.meta.env.VITE_API_URL}/employees`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
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
            employeeNumber,
            // startOfEmploymentData,
            // endOfEmploymentData,
            // lengthOfEmployment,
            typeOfContract,
            jobPosition,
            department,
            salaryLevel,
            centerAttached,
            // superiorHierachicalManager,
            roll,
            professionalPhoneNumber,
            professionalEmail,
            accessPermissions,
            employeePassword
        })
    })
        .then(res => {
            if (res.status === 201)
                return
            return res.json()
                .then(({ error: message }) => { throw new Error(message) })
        })
}