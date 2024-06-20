const { validators: { validateId } } = require('com')
const context = require ('../context')
const { ObjectId } = require('../../../api.6/node_modules/mongodb/mongodb')


module.exports = function retrieveUser(userId){
    validateId (userId, 'user id')

    const { users } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if(!user) throw new Error ('user not found')

            delete user._id
            delete user.password

            return user           
        })
}
