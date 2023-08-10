const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')
const { Administrator, Event } = require('../../data/models')

module.exports = function toggleEventVisibility(adminId, eventId) {
    validateId(adminId, 'admin id')
    validateId(eventId, 'Event id')
    //validate visibility

    return Administrator.findById(adminId)
        .then(admin => {
            if (!admin) throw new ExistenceError(`Admin does not exist`)
            return Event.findById(eventId)
                .then(event => {
                    if (!event) throw new ExistenceError(`This event does not exist`)
                    if(event.visibility===true){
                        event.visibility=false;
                    }
                    else{
                        event.visibility=true;
                    }
                    return event.save()
                })
        })
        .then(() => { })
    }