const { ObjectId } = require('mongodb')

module.exports = () => {
    return{
        _id: new ObjectId(),
        name: `name-${Math.random()}`,
        email: `email-${Math.random()}@mail.com`,
        password: `password-${Math.random()}`,
        avatar: `avatar-${Math.random()}`,
        favs: []
    }
}




