const registerUser = require('./registerUser')

// registerUser('user1', ''user1@dom.com', '123123123', error => {
registerUser('user2', 'user2@dom.com', '123123123', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('user registered')
})