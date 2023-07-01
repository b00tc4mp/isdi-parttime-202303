const authenticateUser = require('./authenticateUser')

authenticateUser('rufus@rufus.es', '123123', (error, userId) => {
    if (error) {
        console.error(error)

        return
    }

    console.log(userId)
})
