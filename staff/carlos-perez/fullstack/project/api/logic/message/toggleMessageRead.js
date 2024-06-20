const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')
const { Administrator, Message } = require('../../data/models')

module.exports = function toggleMessageRead(adminId, messageId) {
    validateId(adminId, 'admin id')
    validateId(messageId, 'lyric Post id')

    return Administrator.findById(adminId)
        .then(admin => {
            if (!admin) throw new ExistenceError(`Admin does not exist`)
            return Message.findById(messageId)
                .then(message => {
                    if (!message) throw new ExistenceError(`This message does not exist`)
                    if(message.status===true){
                        message.status=false;
                    }
                    else{
                        message.status=true;
                    }
                    return message.save()
                })
        })
    }