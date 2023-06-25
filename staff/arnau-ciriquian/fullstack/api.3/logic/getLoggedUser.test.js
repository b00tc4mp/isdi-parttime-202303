import getLoggedUser from "./getLoggedUser.js"

getLoggedUser('user-2', (error, user) => {
    if (error) {
        console.error(error)

        return
    }

    console.log(user)
})