const authenticateUser = require('./authenticateUser')

authenticateUser('user1@dom.com', '123123123', (error, userId) => {
//authenticateUser('user2@dom.com', '123123123', (error, userId) => {
    if (error) {
        console.error(error)

        return
    }

    console.log(userId)
})