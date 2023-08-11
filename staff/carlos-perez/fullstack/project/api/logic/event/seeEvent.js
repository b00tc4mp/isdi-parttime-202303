const { validators: { validateId }, errors: { AuthError} } = require('com')
const { Administrator, Event } = require('../../data/models')

module.exports = (adminId, eventId) => {
    //validateId(adminId, 'administrator id')
    validateId(eventId, 'event id')

    return Administrator.findById(adminId)
    .then(admin => {
        return Event.findById(eventId)
            .then(event => {
                if (!admin){
                    if(event.visibility===true){
                        return event
                    }
                    else{
                        throw new AuthError('You are not an administrator or this event is not visible right now')
                    }
                }

                else{
                    return event
                }
                })
    })
}