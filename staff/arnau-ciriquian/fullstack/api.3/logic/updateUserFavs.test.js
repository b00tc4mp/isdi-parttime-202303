import updateUserFavs from "./updateUserFavs.js"

updateUserFavs('user-3', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('user favs updated')
})