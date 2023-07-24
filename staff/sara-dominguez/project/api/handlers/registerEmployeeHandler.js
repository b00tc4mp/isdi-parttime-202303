const { registerEmployee } = require('../logic')


module.exports = (req, res) => {
    const { name, fistName, secondName, birthDate, idCardNumber, tssNumber, Adress, personalPhoneNumber, accountBankNumber, employeeNumber, StartOfEmploymentData, EndOfEmploymentData, lengthOfEmployment, typeOfContract, jobPosition, salaryLevel, centerAttached, superiorHierarchicalManager, roll, professionalPhoneNumber, professionalEmail, accessPermissions, employeePassword } = req.body

    return registerEmployee(name, fistName, secondName, birthDate, idCardNumber, tssNumber, Adress, personalPhoneNumber, accountBankNumber, employeeNumber, StartOfEmploymentData, EndOfEmploymentData, lengthOfEmployment, typeOfContract, jobPosition, salaryLevel, centerAttached, superiorHierarchicalManager, roll, professionalPhoneNumber, professionalEmail, accessPermissions, employeePassword)
        .then(() => { res.status(201).send() })
}