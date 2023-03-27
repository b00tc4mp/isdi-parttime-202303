
var checkUserExists = (registrationName, registrationEmail, registrationPassword) => {
    var foundUser
    for (let i = 0; i < users.length; i++){
        var user = users[i]
        
        if(registrationEmail === user.email){
            foundUser = user
        
        } 
    }
    
    if (!foundUser) {
            users.push({
                username: registrationName,
                email: registrationEmail,
                password: registrationPassword
               })
            return true

    } else return false 
}

var checkCredentials = (inputEmail, inputPassword) => {
    var foundUser

    for (let i = 0; i < users.length; i++){
        var user = users[i]

        if (inputEmail === user.email){
        foundUser = user
        }
    }

    if (!foundUser || foundUser.password !== inputPassword)
    return false

    else return true
}


var checkCurrentPassword = (currentPassword) => {
    if (currentPassword !== authenticatedPassword){
        return false
    } else return true
}

var checkPasswordMatch = (newPassword, confirmNewPassword) => {
    if (newPassword !== confirmNewPassword){
        return false
    } else return true
}

var updatePassword = (users, authenticatedEmail, newPassword) =>{
    var foundUser

    for (let i = 0; i < users.length; i++){
        var user = users[i]
        if (user.email === authenticatedEmail){
            foundUser = user
            foundUser.password = newPassword
            users[i] = foundUser
        }
    }
}