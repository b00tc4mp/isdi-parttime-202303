
/**
 * Register an employee
 * 
 * @param {string} name The employee name
 * @param {string} firsName  The employee firstName
 * @param {string} secondName  The employee secondName
 * @param {string} birthDate  The employee birthdate
 * @param {string} idCardNumber   The employee id card number
 * @param {string} tssNumber  The employee TGSS number
 * @param {string} adress  The employee personal adress
 * @param {string} personalPhoneNumber  The employee personal phone number
 * @param {string} accounBankNumber  The employee accoun bank number
 * @param {string} employeeNumber  The employee company credential: id number
 * @param {string} startOfEmploymentData  Data when employee work relationship started
 * @param {string} endOfEmploymentData  Data when employee work relationship ends (opciona). Only for temporary contracts )
 * @param {string} lengthOfEmployment Employuee employment duration
 * @param {string} typeOfContract  employee temporary or permanent contract  
 * @param {string} jopPosition  employee position
 * @param {string} department  employee department
 * @param {string} salaryLevel  employee salary scale from 5 (least) to 1 (highest)
 * @param {string} centerAttached  Assigned center of the employee
 * @param {string} superiorHierarchicalManager  Inmediate supervisor of the employee
 * @param {string} roll  authorization level of employee's usage profile
 * @param {string} professionalPhoneNumber  The employee professional phone number
 * * @param {string} professionalEmail  The employee professional email.
 * @param {string} accessPermissions  current status of employee's permission, authorized or denied.
 * @param {string} employeePassword  employee password
// 
//  * @throws {TypeError} On non-string email or password
//  * @throws {ContentError} On empty email
//  * @throws {RangeError} On password length lower than 6 characters and upper than 15 characters
//  * @throws {ExistenceError} On non-existing user
//  * @throws {AuthError} On wrong credentials
//  */



module.exports = function registerEmployee(name, firstName, secondName, birthDate, idCardNumber, tssNumber, adress, personalPhoneNumber, bankAccountNumber, employeeNumber, startOfEmploymentData, endOfEmploymentData, lengthOfEmployment, typeOfContract, jobPosition, department, salaryLevel, centerAttached, superiorHierarchicalManager, roll, professionalPhoneNumber, professionalEmail, accessPermissions, employeePassword) {

    //TODO validators and handlerErrors

    const { Employee } = require('../data/models')

    return Employee.create({
        // personalData: {
        name,
        firstName,
        secondName,
        birthDate,
        idCardNumber,
        tssNumber,
        adress,
        personalPhoneNumber,
        bankAccountNumber,

        // professionalData:
        employeeNumber,
        startOfEmploymentData,
        endOfEmploymentData,
        lengthOfEmployment,
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
        employeePassword,
    })
        .catch(error => {
            if (error.message.includes('E11000'))
                throw new Error(`user with email ${email} already exists`)
            throw error
        })


}