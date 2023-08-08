const { Employee } = require('../data/models')
// const { BSON } = require('mongodb')
const {
    validators: { validateId, validateSalaryLevel } = require('com'),
    // errors: { ExistenceError }
} = require('com')


/**
 * Retrieve a employee against his/her salaryLevel
 * 
 * @param {string} employeeId  The employee id
 * @param {number} salaryLevel  The employee salary level
 
* @returns {Promise}  array of employee objects matching the given salary level
//  * 
//  * @throws {TypeError} On non-string employeeId or salaryLevel is not a number
//  * @throws {ContentError} On employeeId is empty or  doesn't have 24 characters or not hexadecimal or salaryLevel is empty
//  * @throws {RangeError} On salaryLevel is not a integer between 1 and 5 
//  * @throws {ExistenceError} On non-existing employee
// 
 */

module.exports = function retrieveEmployeesBySalaryLevel(employeeId, salaryLevel) {
    validateId(employeeId)
    validateSalaryLevel(salaryLevel)
    //TODO EMPLOYEE PERMISSIONS OK 


    // return Employee.findById(employeeId).lean()
    //     .then(employee => {
    //         if (!employee) throw new Error(`employee with id ${employeeId} not found`)


    //         return Employee.find({ salaryLevel: salaryLevel }, 'avatar name firsName secondSurname salaryLevel').lean()
    //     })

    //     .then((employeeListRetrieved) => {
    //         if (!employeeListRetrieved || employeeListRetrieved.length === 0) throw new Error(`Not found any employee with ${salaryLevel} this salary level`)

    //         return employeeListRetrieved
    //     })

    return (async () => {
        try {
            const employee = await Employee.findById(employeeId).lean()


            if (!employee) throw new ExistenceError('employee not found')


            const employeeListRetrieved = await Employee.find({ salaryLevel: salaryLevel }, 'avatar name firstSurname secondSurname salaryLevel').lean()

            for (i = 0; i < employeeListRetrieved.length; i++) {
                delete employeeListRetrieved[i]._id
                delete employeeListRetrieved[i].__v
            }


            if (!employeeListRetrieved || employeeListRetrieved.length === 0) throw new Error(`Not found any employee with  salary Level ${salaryLevel} `)

            return employeeListRetrieved
        } catch (error) {
            // throw new UnknownError(error)
            throw new Error(error.message)
        }
    })()

}





