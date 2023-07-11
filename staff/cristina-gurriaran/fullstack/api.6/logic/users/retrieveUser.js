const { 
    validators: { validateId },
    errors : { ExistenceError}
 } = require('com')
const context = require ('../context')
const { ObjectId } = require('mongodb')


module.exports = function retrieveUser(userId){
    validateId (userId, 'user id')

    const { users } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new ExistenceError ('user not found')

            delete user._id
            delete user.password
  
            return user           
        })
}
