
var checkUserExists = (registrationName, registrationEmail, registrationPassword,registrationRepPassword) => {
    var foundUser
    for (let i = 0; i < users.length; i++){
        var user = users[i]
        
        if(registrationEmail === user.email){
            foundUser = user
        } 
    }
    if (foundUser) throw new Error('User already exists')

    if(registrationPassword !== registrationRepPassword) throw new Error('Passwords do not match')
            
    else{ users.push({
                username: registrationName,
                email: registrationEmail,
                password: registrationPassword
               })
    }
}

var checkCredentials = (inputEmail, inputPassword) => {
    var foundUser

    for (let i = 0; i < users.length; i++){
        var user = users[i]

        if (inputEmail === user.email){
        foundUser = user
        }
    }

    if (!foundUser || foundUser.password !== inputPassword) throw new Error('Invalid email or password')
}

var updatePassword = (users, authenticatedEmail, currentPassword, newPassword, confirmNewPassword) =>{

    if (currentPassword !== authenticatedPassword) throw new Error('Invalid current password')

    if (currentPassword === newPassword) throw new Error('Current password cannot be the same as new password')

    if (newPassword !== confirmNewPassword) throw new Error('New passwords do not match')

    for (let i = 0; i < users.length; i++){
        var user = users[i]

        if (user.email === authenticatedEmail){
            users[i].password = newPassword
            authenticatedPassword = newPassword
        }
    }
}


var updateEmail = (users, authenticatedEmail, currentEmail, newEmail, confirmNewEmail) => {

    
    if (currentEmail!== authenticatedEmail) throw new Error('Invalid current email')

    if (currentEmail === newEmail) throw new Error('Current email cannot be the same as new email')

    if (newEmail !== confirmNewEmail) throw new Error('New emails do not match')

    for (let i = 0; i < users.length; i++){
        user = users[i]

        if (user.email === authenticatedEmail){
                users[i].email = newEmail
                authenticatedEmail = newEmail
        } 
    }
}

var findUser = (users, authenticatedEmail) => {
   return users.find(user => user.email === authenticatedEmail)
}

var updateAvatar = (authenticatedEmail, avatarUrl) => {

    var user = findUser(users, authenticatedEmail)
    if (!user) throw new Error('User not found')

    user.avatar = avatarUrl
} 