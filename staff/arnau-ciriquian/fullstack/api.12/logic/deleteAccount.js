const { ObjectId } = require('mongodb')
const context = require('./context')
const { validators: { validateId } } = require('com')

module.exports = (userId) => {
    validateId(userId)
    
    const { users } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error('user not found')
        
            return users.findOneAndDelete({ _id: new ObjectId(userId) })
        })
}