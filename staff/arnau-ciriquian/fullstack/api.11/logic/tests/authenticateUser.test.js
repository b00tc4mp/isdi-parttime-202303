const authenticateUser = require("../authenticateUser")

authenticateUser('tinkero@bell.com', '123123123', (error, userId) => {
    if (error) {
        console.error(error)

        return
    }

    console.log(userId)
})