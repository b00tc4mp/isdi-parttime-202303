const retrievePost = require('./retrievePost')

retrievePost('user-1','user-1-1685098291599', (error, user) => {
    if (error) {
        console.error(error)

        return
    }

    console.log(user)
})