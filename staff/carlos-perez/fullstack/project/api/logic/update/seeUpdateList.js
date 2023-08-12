const { Administrator, Update } = require('../../data/models')

module.exports = (adminId) => {

    return Administrator.findById(adminId)
    .then(admin => {

        if(!admin){
            return Update.find({"visibility": true}).lean()
            .then(updates =>{ return updates})
        }
        else{
            return Update.find().lean()
            .then(updates => { return updates})
        }
        
    })
}