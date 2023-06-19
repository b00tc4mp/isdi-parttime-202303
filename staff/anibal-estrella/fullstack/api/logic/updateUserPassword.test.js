const updateUserPassword = require('./updateUserPassword')

const newPassword = 'new-123123123'

updateUserPassword('user-1', '123123123', newPassword, newPassword, error => {
    if (error) {
        console.log(error);

        return
    }

    console.log('password updated!')
})