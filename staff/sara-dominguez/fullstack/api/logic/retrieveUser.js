

module.exports = function retrieveUser(userId, callback){
    //TODO validators

    findUserById(userId, error,  user => {
        if(!user) {
            callback(new Error('user not found'))

            return
        }

        const user = {
            name: user.name,
            avatar: user.avatar
        }

        callback(null, user)
    })
}
