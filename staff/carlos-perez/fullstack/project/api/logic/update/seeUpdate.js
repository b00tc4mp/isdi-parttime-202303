const { validators: { validateId }, errors: { AuthError} } = require('com')
const { Administrator, Update } = require('../../data/models')

module.exports = (adminId, updateId) => {
    //validateId(adminId, 'administrator id')
    validateId(updateId, 'update id')

    return Administrator.findById(adminId)
    .then(admin => {
        return Update.findById(updateId)
            .then(update => {
                if (!admin){
                    if(update.visibility===true){
                        return update
                    }
                    else{
                        throw new AuthError('You are not an administrator or this update is not visible right now')
                    }
                }

                else{
                    return update
                }
                })
    })
}