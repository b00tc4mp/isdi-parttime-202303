const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')
const { Administrator, Message } = require('../../data/models')

module.exports = function (adminId, messageId) {

    validateId(adminId, 'Administrator ID')
    validateId(messageId, 'Message ID')


    return Administrator.findById(adminId).then((admin) => {

        if (!admin) throw new ExistenceError('Administrator not found!')

        return Message.findById(messageId).then((message) => {
            if (!message) throw new ExistenceError('message not found')

            return message.deleteOne({ _id: messageId })

        })
    })

}