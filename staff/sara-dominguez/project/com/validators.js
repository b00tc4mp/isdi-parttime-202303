const { ContentError } = require('./errors')
// const EMAIL_REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

function validateName(name, explain = "name") {
    const nameRegex = /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/
    if (!nameRegex.test(name)) throw new ContentError(`Invalid format of ${explain}`)
    if (typeof name !== 'string') throw new TypeError(`${explain} is not a string`)
    if (name.trim().length < 3) throw new RangeError(`${explain} length lower than 3 characters`)
    if (name.trim().length > 15) throw new RangeError(`${explain} length upper 15 characters`)
}

function validateFirstSurname(firstSurname, explain = "firstSurname") {
    const firstSurnameRegex = /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/
    if (!firstSurnameRegex.test(firstSurname)) throw new ContentError(`Invalid format of ${explain}`)
    if (typeof firstSurname !== 'string') throw new TypeError(`${explain} is not a string`)
    if (!firstSurname.trim().length) throw new ContentError(`${explain} is empty`)
    if (firstSurname.trim().length < 3) throw new RangeError(`${explain} length lower than 3 characters`)
    if (firstSurname.trim().length > 15) throw new RangeError(`${explain} length upper 15 characters`)
}

function validateSecondSurname(secondSurname, explain = "secondSurname") {
    const secondSurnameRegex = /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/
    if (!secondSurnameRegex.test(secondSurname)) throw new ContentError(`Invalid format of ${explain}`)
    if (typeof secondSurname !== 'string') throw new TypeError(`${explain} is not a string`)
    if (secondSurname.trim().length < 3) throw new RangeError(`${explain} length lower than 3 characters`)
    if (secondSurname.trim().length > 15) throw new RangeError(`${explain} length upper 15 characters`)
}

function validateIdCardNumber(idCardNumber, explain = "idCardNumber") {
    const idCardNumberRegex = /^\d{8}[A-Z]$/
    if (!idCardNumberRegex.test(idCardNumber)) throw new ContentError(`Invalid format of ${explain}`)
    if (typeof idCardNumber !== 'string') throw new TypeError(`${explain} is not a string`)
}
//TODO revisar regex de ValicateTssNumber y data model
function validateTssNumber(tssNumber, explain = "tssNumber") {
    const tssNumberRegex = /[0-9]{12}$/
    if (!tssNumberRegex.test(tssNumber)) throw new ContentError(`Invalid format of ${explain}`)
    if (typeof tssNumber !== 'string') throw new TypeError(`${explain} is not a string`)
}

function validateAddress(address, explain = "address") {
    const addressRegex = /^[A-Z][a-zA-Z0-9\s]+ (?:street|avenue|plaza|road) \d{1,5}(?: [0-9A-Za-z\s]+)? \d{5} [A-Z][a-zA-Z\s]+ \(?[A-Z][a-zA-Z\s]+\)? [A-Z][a-zA-Z\s]+$/
    if (!addressRegex.test(address)) throw new ContentError(`Invalid format of ${explain}`)
    if (typeof address !== 'string') throw new TypeError(`${explain} is not a string`)
}

function validatePersonalPhoneNumber(personalPhoneNumber, explain = "personalPhoneNumber") {
    if (typeof personalPhoneNumber !== 'number') throw new TypeError(`${explain} is not a number`)
    const personalPhoneNumberToString = personalPhoneNumber.toString()
    if (personalPhoneNumberToString.length === 0) throw new ContentError(`${explain}  is empty`)
    if (personalPhoneNumberToString.length !== 9) throw new ContentError(`${explain}  does not have 9 characters`)
}

function validateBankAccountNumber(bankAccountNumber, explain = 'bankAccountNumber') {
    const bankAccountnumberRegex = /^ES\d{2}\d{20}$/
    if (!bankAccountnumberRegex.test(bankAccountNumber)) throw new ContentError(`Invalid format of ${explain}`)
    if (typeof bankAccountNumber !== 'string') throw new TypeError(`${explain} is not a string`)
}

function validateUrl(newAvatar, explain = 'url') {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/
    if (!urlRegex.test(newAvatar)) throw new ContentError(`Invalid format of ${explain}`)
    if (typeof newAvatar !== 'string') throw new TypeError(`${explain} is not a string`);
}

function validateEmployeeNumber(employeeNumber, explain = "employeeNumber") {
    if (typeof employeeNumber !== 'string') throw new TypeError(`${explain} is not a string`)
    if (!employeeNumber.trim().length) throw new ContentError(`${explain}  is empty`)
    if (employeeNumber.trim().length !== 5) throw new ContentError(`${explain}  does not have 5 characters`)
}

function validateTypeOfContract(typeOfContract, explain = 'typeOfContract') {
    if (typeof typeOfContract !== 'string') throw new TypeError(`${explain} is not a string`);
    if (!typeOfContract.trim().length) throw new ContentError(`${explain} is empty`)
    if (typeOfContract !== "Temporal" && typeOfContract !== "Permanent") throw new ContentError(`Invalid value for ${explain}`)
}
function validateJobPosition(jobPosition, explain = 'jobPosition') {
    if (typeof jobPosition !== 'string') throw new TypeError(`${explain} is not a string`);
    if (!jobPosition.trim().length) throw new ContentError(`${explain} is empty`)
    if (jobPosition !== "CEO" && jobPosition !== "CFO" && jobPosition !== "CTO" && jobPosition !== "Executive" && jobPosition !== "Manager" && jobPosition !== "Developer" && jobPosition !== "Financial Controller" && jobPosition !== "Assistant") throw new ContentError(`Invalid value for ${explain}`)
}

function validateDepartment(department, explain = 'department') {
    if (typeof department !== 'string') throw new TypeError(`${explain} is not a string`);
    if (!department.trim().length) throw new ContentError(`${explain} is empty`)
    if (department !== "Development" && department !== "Design" && department !== "Financial" && department !== "Human Resources" && department !== "C-Suite") throw new ContentError(`Invalid value for ${explain}`)
}

function validateSalaryLevel(salaryLevel, explain = 'salary level') {
    if (typeof salaryLevel !== 'number') throw new TypeError(`${explain}  is not a number`);
    if (salaryLevel === '') throw new ContentError(`${explain}  is empty`)
    if (!Number.isInteger(salaryLevel) || salaryLevel < 1 || salaryLevel > 6) {
        throw new RangeError(`${explain}  is not an integer between 1 and 6`);
    }
}
function validateCenterAttached(centerAttached, explain = 'centerAttached') {
    if (typeof centerAttached !== 'string') throw new TypeError(`${explain} is not a string`);
    if (!centerAttached.trim().length) throw new ContentError(`${explain} is empty`)
    if (centerAttached !== "Barcelona" && centerAttached !== "Madrid" && centerAttached !== "Malaga") throw new ContentError(`Invalid value of ${explain}`)
}
function validateRoll(roll, explain = 'roll') {
    if (typeof roll !== 'string') throw new TypeError(`${explain} is not a string`);
    if (!roll.trim().length) throw new ContentError(`${explain} is empty`)
    if (roll !== "User" && roll !== "Admin") throw new ContentError(`Invalid value of ${explain}`)
}

function validateProfessionalPhoneNumber(professionalPhoneNumber, explain = "professionalPhoneNumber") {
    if (typeof professionalPhoneNumber !== 'number') throw new TypeError(`${explain} is not a number`)
    const professionalPhoneNumberToString = professionalPhoneNumber.toString()
    if (professionalPhoneNumberToString.length === 0) throw new ContentError(`${explain}  is empty`)
    if (professionalPhoneNumberToString.length !== 9) throw new ContentError(`${explain}  does not have 9 characters`)
}
function validateAccessPermissions(accessPermissions, explain = 'accessPermissions') {
    if (typeof accessPermissions !== 'string') throw new TypeError(`${explain} is not a string`);
    if (!accessPermissions.trim().length) throw new ContentError(`${explain} is empty`)
    if (accessPermissions !== "Authorized" && accessPermissions !== "Denied") throw new ContentError(`Invalid value of ${explain}`)
}

function validateEmail(email, explain = "email") {
    const emailRegex = /^[\w-.]+@b-elevenzsd.es/
    if (typeof email !== 'string') throw new TypeError(`${explain}  is not a string`)
    if (!email.trim().length) throw new ContentError(`${explain}  is empty`)
    if (!emailRegex.test(email)) throw new ContentError(`invalid ${explain}`)
}

function validateEmployeePassword(employeePassword, explain = "employeePassword") {
    const hasDigit = /\d/.test(employeePassword)
    const hasUpper = /[A-Z]/.test(employeePassword)
    const hasLower = /[a-z]/.test(employeePassword)
    const specialChar = /[-_+/#&]/.test(employeePassword)

    if (!hasDigit) throw new ContentError(`${explain}  don't have digit`)
    if (!hasUpper) throw new ContentError(`${explain}  don't have uppercase`)
    if (!hasLower) throw new ContentError(`${explain}  don't have lowercase`)
    if (!specialChar) throw new ContentError(`${explain}  must have at least one special character`)
    if (typeof employeePassword !== 'string') throw new TypeError(`${explain}  is not a string`);
    if (!employeePassword.trim().length) throw new ContentError(`${explain}  is empty`)
    if (employeePassword.trim().length < 6) throw new RangeError(`${explain}  length lower than 6 characters`)
    if (employeePassword.trim().length > 12) throw new RangeError(`${explain}  length upper 12 characters`)
}



const HEX_DICTIONARY = '0123456789abcdef'

function validateId(id, explain = 'id') {
    if (typeof id !== 'string') throw new TypeError(`${explain} is not a string`)
    if (id.trim().length !== 24) throw new ContentError(`${explain} doesn't have 24 characters`)

    for (let i = 0; i < id.length; i++) {
        const char = id[i]

        if (!HEX_DICTIONARY.includes(char)) throw new ContentError(`${explain} is not hexadecimal`)
    }
}

function validateText(text, explain = 'text') {
    if (typeof text !== 'string') throw new TypeError(`${explain} is not a string`)
    if (!text.trim().length) throw new ContentError(`${explain} is empty`)
}

function validateCallback(callback, explain = 'callback') {
    if (typeof callback !== 'function') throw new TypeError(`${explain} is not a function`)
}

function validateToken(token, explain = 'token') {
    if (typeof token !== 'string') throw new TypeError(`${explain} is not a string`)
    if (token.split('.').length !== 3) throw new ContentError(`${explain} is not valid`)
}

function validatePayrollYear(payrollYear, explain = 'payrollYear') {
    if (typeof payrollYear !== 'number') throw new TypeError(`${explain}  is not a number`);
    if (payrollYear === '') throw new ContentError(`${explain}  is empty`)
    if (!Number.isInteger(payrollYear)) throw new RangeError(`${explain}  must be an integer number`);
}

function validatePayrollMonth(payrollMonth, explain = 'payrollMonth') {
    if (typeof payrollMonth !== 'number') throw new TypeError(`${explain} is not a number`)
    if (payrollMonth === '') throw new ContentError(`${explain}  is empty`)
    if (!Number.isInteger(payrollMonth) || payrollMonth < 1 || payrollMonth > 12) {
        throw new RangeError(`${explain}  must be an integer between 1 and 12`);
    }
}
function validateSearchPattern(searchPattern, explain = 'searchPattern') {
    if (typeof searchPattern !== 'string') throw new TypeError(`${explain} is not a string`)
    if (searchPattern === '') throw new ContentError(`${explain}  is empty`)
}


module.exports = {
    validateName,
    validateFirstSurname,
    validateSecondSurname,
    validateIdCardNumber,
    validateTssNumber,
    validateAddress,
    validatePersonalPhoneNumber,
    validateBankAccountNumber,
    validateUrl,
    validateEmail,
    validateEmployeePassword,
    validateEmployeeNumber,
    validateTypeOfContract,
    validateJobPosition,
    validateDepartment,
    validateCenterAttached,
    validateRoll,
    validateProfessionalPhoneNumber,
    validateAccessPermissions,
    validateId,
    validateText,
    validateCallback,
    validateToken,
    validateSalaryLevel,
    validatePayrollYear,
    validatePayrollMonth,
    validateSearchPattern
}