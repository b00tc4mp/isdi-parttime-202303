const { registerEmployee } = require('../logic')
const { handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {

    const {
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
        superiorHierarchicalManager,
        roll,
        professionalPhoneNumber,
        professionalEmail,
        accessPermissions,
        // employeePassword
    } = req.body

    const promise = registerEmployee(
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
        superiorHierarchicalManager,
        roll,
        professionalPhoneNumber,
        professionalEmail,
        accessPermissions,
        // employeePassword
    )
    return (async () => {
        await promise

        res.status(201).send()
    })()
})