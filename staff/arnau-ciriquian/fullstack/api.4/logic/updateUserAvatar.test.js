import updateUserAvatar from "./updateUserAvatar.js"

updateUserAvatar('user-2', 'https://static.wikia.nocookie.net/criticalrole/images/c/cd/VexTLOVM.png/revision/latest?cb=20220204041409', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('avatar updated')
})