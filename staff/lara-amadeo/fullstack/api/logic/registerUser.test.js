const registerUser = require('./registerUser')

registerUser('PepitoG', 'pepito@gmail.com', '123123123', error => {
    if(error){
        console.log(error)
        return
    }

    console.log('user registered!')
})