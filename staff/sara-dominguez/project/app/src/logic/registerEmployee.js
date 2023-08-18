
import { validators } from 'com'
const {
    validateName,
    validateFirstSurname,
    validateSecondSurname,
    validateIdCardNumber,
    validateTssNumber,
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


export default (name,
    firstSurname,
    secondSurname,
    // birthDate,
    idCardNumber,
    tssNumber,
    adress,
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
            adress,
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