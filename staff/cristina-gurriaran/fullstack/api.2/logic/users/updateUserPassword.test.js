const updateUserPassword = require('./updateUserPassword')

updateUserPassword('user-1','123123123','234234234','234234234', error => {
    if(error){
        callback(error)
        return
    }

    console.log('password succesfully updated')
})