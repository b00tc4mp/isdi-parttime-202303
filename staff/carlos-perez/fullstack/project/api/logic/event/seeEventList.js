//const { validators: { validateId }, errors: { AuthError} } = require('com')
const { Administrator, Event } = require('../../data/models')

module.exports = (adminId) => {
    //validateId(adminId, 'administrator id')

    return Administrator.findById(adminId)
    .then(admin => {

        if(!admin){
            return Event.find({"visibility": true}).lean()
            .then(events =>{ return events})
        }
        else{
            return Event.find().lean()
            .then(events => { return events})
        }
        
    })
}