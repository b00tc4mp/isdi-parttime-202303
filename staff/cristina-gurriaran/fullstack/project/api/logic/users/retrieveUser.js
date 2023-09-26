const { 
    errors : { ExistenceError}
 } = require('com')
const { User } = require('../../data/models')


module.exports = userId => {
    return (async () => {
        const user = await User.findById(userId, 'name avatar').lean()          
        
        if (!user) throw new ExistenceError(`user with id ${userId} not found`)

        delete user._id

        return user    
               
    })()
}
