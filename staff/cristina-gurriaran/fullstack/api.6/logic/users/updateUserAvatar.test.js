const updateUserAvatar = require('./updateUserAvatar')

updateUserAvatar('user-1','avatarURL', error => {
    if(error){
        callback(error)
        return
    }

    console.log('avatar succesfully updated')
})