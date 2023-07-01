const registerUser = require('./registerUser')

registerUser('Rufus', 'rufus@rufus.es', '123123', error => {
    if(error) {
        console.error(error)

        return
    }

    console.log('user registered')
})