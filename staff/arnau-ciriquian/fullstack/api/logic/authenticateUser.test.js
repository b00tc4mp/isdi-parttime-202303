const authenticateUser = require('./authenticateUser')

authenticateUser('pepito@grillo1.com', '123123123', (error, userId) => {
    if (error) {
        console.error(error)

        return
    }

    console.log(userId)
})