const { registerEmployee } = require('../logic')


module.exports = (req, res) => {
    const { name, firstSurname, secondSurname, birthDate, idCardNumber, tssNumber, adress, personalPhoneNumber, bankAccountNumber, employeeNumber, startOfEmploymentData, endOfEmploymentData, lengthOfEmployment, typeOfContract, jobPosition, department, salaryLevel, centerAttached, superiorHierarchicalManager, roll, professionalPhoneNumber, professionalEmail, accessPermissions, employeePassword } = req.body

    return registerEmployee(name, firstSurname, secondSurname, birthDate, idCardNumber, tssNumber, adress, personalPhoneNumber, bankAccountNumber, employeeNumber, startOfEmploymentData, endOfEmploymentData, lengthOfEmployment, typeOfContract, jobPosition, department, salaryLevel, centerAttached, superiorHierarchicalManager, roll, professionalPhoneNumber, professionalEmail, accessPermissions, employeePassword)
        .then(() => { res.status(201).send() })
}