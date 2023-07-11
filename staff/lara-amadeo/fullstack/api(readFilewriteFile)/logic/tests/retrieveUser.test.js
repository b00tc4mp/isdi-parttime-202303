const retrieveUser = require('../retrieveUser')
const randomNumFromInterval = require('../helpers/randoms')

randomId = randomNumFromInterval(1, 4)

retrieveUser(`user-${randomId}`, (error, user) => {
    if(error){
        console.error(error)
        return
    }

    console.log(`User with id user-${randomId} has a username ${user.username} and email ${user.email} and ${user.avatar}`)
})