const updateUserAvatar = require("./updateUserAvatar.js")

updateUserAvatar('user-2', 'new avatar', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('avatar updated')
})