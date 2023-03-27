
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
    for (let i = 0; i < users.length; i++){
        var user = users[i]
        
        if (user.email === authenticatedEmail){
            users[i].password = newPassword
        }
    }
}

var checkCurrentEmail = (currentEmail) => {
    if (currentEmail !== authenticatedEmail){
        return false
    } else return true
}

var checkEmailMatch = (newEmail, confirmNewEmail) => {
    if (newEmail !== confirmNewEmail){
        return false
    } else return true
}

var updateEmail = (users, authenticatedEmail, newEmail) => {
    for (let i = 0; i < users.length; i++){
        user = users[i]

        if (user.email === authenticatedEmail){
                users[i].email = newEmail
        } 
    }
}