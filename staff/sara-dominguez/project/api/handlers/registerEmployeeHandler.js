const { registerEmployee } = require('../logic')
const { handleErrors } = require('./helpers')
const { extractEmployeeId } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const employeeLoggedId = extractEmployeeId(req)

    const {
        name,
        firstSurname,
        secondSurname,
        idCardNumber,
        tssNumber,
        address,
        personalPhoneNumber,
        bankAccountNumber,
        avatar,
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
    } = req.body

    const promise = registerEmployee(
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
    )
    return (async () => {
        await promise

        res.status(201).send()
    })()
})