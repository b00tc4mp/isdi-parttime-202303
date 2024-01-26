const { handleErrors } = require('./helpers')
const { updateEmployee } = require('../logic')
const { extractEmployeeId } = require('./helpers')

module.exports = handleErrors((req, res,) => {
    const employeeLoggedId = extractEmployeeId(req)

    const {
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
    } = req.body

    const promise = updateEmployee(
        employeeLoggedId,
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
    )

    return (async () => {
        await promise

        res.status(204).send()
    })()
})