import updateUserPassword from "./updateUserPassword.js"

updateUserPassword('user-3', 'Ona1', 'Onilla1', 'Onilla1', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('password updated')
})