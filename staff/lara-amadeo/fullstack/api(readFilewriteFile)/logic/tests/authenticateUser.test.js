const authenticateUser = require('./authenticateUser')

authenticateUser('pepito@gmail.com', 'Manzana12!', (error, userId) => {
    if(error){
        console.error(error)

        return
    }

    console.log(userId)
})