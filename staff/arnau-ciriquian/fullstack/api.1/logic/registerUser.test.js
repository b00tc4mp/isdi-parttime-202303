const registerUser = require('./registerUser')

registerUser('Tinker', 'tinkero@bell.com', '123123123', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('user registered')
})