const registerUser = require('./registerUser')

registerUser('SheldonC', 'sheldon@cooper.com', 'Manzana12!', error => {
    if(error){
        console.log(error)
        return
    }

    console.log('user registered!')
})