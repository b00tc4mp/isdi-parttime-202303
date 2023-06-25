const updateUsername = require("./updateUsername.js")

updateUsername('user-4', 'Ona', 'Onilla', 'Ona1', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('username updated')
})