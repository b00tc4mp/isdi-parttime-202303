const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')
const { Administrator, Update } = require('../../data/models')

module.exports = function (adminId, updateId) {

    validateId(adminId, 'Administrator ID')
    validateId(updateId, 'Update ID')


    return Administrator.findById(adminId).then((admin) => {

        if (!admin) throw new ExistenceError('Administrator not found!')

        return Update.findById(updateId).then((update) => {
            if (!update) throw new ExistenceError('Update not found')

            return Update.deleteOne({ _id: updateId })

        })
    })

}