const updateUserFavs = require("./updateUserFavs.js")

updateUserFavs('user-3', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('user favs updated')
})