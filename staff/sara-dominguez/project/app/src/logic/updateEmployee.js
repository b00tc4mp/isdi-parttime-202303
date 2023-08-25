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
    // validateProfessionalEmail,
    validateAccessPermissions,
} = validators

/**
* Update an employee
* 
* @param {string} newAvatar  URL of the new avatar for the employee
* 
* @returns {Promise<void>} Ends when the avatar is updated.
* 
* @throws {TypeError} On non-string URL
* @throws {ContentError} On empty URL
*/

export default function updateEmployee(
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