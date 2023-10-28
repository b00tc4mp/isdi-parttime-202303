const {
    validators: { validateId, validateText, validateUrl },
    errors: { ExistenceError }
} = require('com')
const { Administrator, Update } = require('../../data/models')

module.exports = function toggleUpdateVisibility(adminId, updateId) {
    validateId(adminId, 'admin id')
    validateId(updateId, 'update id')
    //validate visibility

    return Administrator.findById(adminId)
        .then(admin => {
            if (!admin) throw new ExistenceError(`Admin does not exist`)
            return Update.findById(updateId)
                .then(update => {
                    if (!update) throw new ExistenceError(`This update does not exist`)
                    if(update.visibility===true){
                        update.visibility=false;
                    }
                    else{
                        update.visibility=true;
                    }
                    return update.save()
                })
        })
        .then(() => { })
}