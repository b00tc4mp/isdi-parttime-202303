const updateUserPassword = require("./updateUserPassword.js")

updateUserPassword('user-4', 'Ona1', 'Onilla1', 'Onilla1', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('password updated')
})