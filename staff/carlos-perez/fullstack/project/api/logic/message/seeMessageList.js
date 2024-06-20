const { validators: { validateId }, errors: {AuthError} } = require('com')
const { Administrator, Message } = require('../../data/models')

module.exports = (adminId) => {

    validateId(adminId)

    return Administrator.findById(adminId)
    .then(admin => {
        if(!admin){
            throw new AuthError("You have no permission")
        }
        else{
            return Message.find().lean()
            .then(messages => { return messages})
        }
        
    })
}