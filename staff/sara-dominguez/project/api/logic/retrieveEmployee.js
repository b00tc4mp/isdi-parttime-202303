//TODO validators

/**
 * Authenticates a user against his/her credentials
 * 
 * @param {string} employeeId  The employee id
 * 
 * @returns {Promise<string>} The employee id 
//  * 
//  * @throws {TypeError} On non-string email or password
//  * @throws {ContentError} On empty email
//  * @throws {RangeError} On password length lower than 6 characters and upper than 15 characters
//  * @throws {ExistenceError} On non-existing user
//  * @throws {AuthError} On wrong credentials
 */

module.exports = function retrieveUser(employeeId) {
    //TODO validators

    const { Employee } = require('../data/models')

    // return User.find({ _id: userId })
    // aprovechamos .findById() en la lógica que te permite traer el id sin el ObjectId, te lo convierte automáticamente a String

    return Employee.findById(employeeId)
        .then(employee => {
            if (!employee) throw new Error('employee not found')

            // 2. sanitaze
            //TODO sanitaze

            return employee
        })
}