const updateUserEmail = require('./updateUserEmail')

const email = 'updateUserEmail@example.com'

updateUserEmail('user-1', email, email, error => {
    if (error) {
        console.log(error);

        return
    }

    console.log('email updated!')
})