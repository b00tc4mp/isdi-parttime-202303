const { Employee } = require('../data/models')
const {
    validators: { validateId },
    // errors: { ExistenceError }
} = require('com')
const { UnknownError } = require('com/errors')


/**
 * Retrieve a employee against his/her id
 * 
 * @param {string} employeeId  The employee id
 * 
 * @returns {Promise<string>} employee  
//  * 
//  * @throws {TypeError} On non-string employeeId
//  * @throws {ContentError} On id is empty or  doesn't have 24 characters or not hexadecimal
//  * @throws {ExistenceError} On non-existing employee
// 
 */

module.exports = function retrieveEmployee(employeeId) {
    validateId(employeeId)

    const { Employee } = require('../data/models')

    // return Employee.find({ _id: employeeId })
    // aprovechamos .findById() en la lógica que te permite traer el id sin el ObjectId, te lo convierte automáticamente a String

    // return Employee.findById(employeeId)
    //     .then(employee => {
    //         if (!employee) throw new Error('employee not found')
    //         delete employee._id

    //         return employee
    //     })

    return (async () => {
        try {
            const employee = await Employee.findById(employeeId).lean()

            if (!employee) throw new ExistenceError('employee not found')

            delete employee._id
            delete employee.__v

            return employee
        } catch (error) {
            // throw new UnknownError(error)
            throw new Error(error.message)
        }
    })()
}