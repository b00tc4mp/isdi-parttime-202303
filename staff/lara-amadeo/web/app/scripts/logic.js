

var checkUserExists = (registrationName, registrationEmail, registrationPassword,registrationRepPassword) => {
    var foundUser = findUser(users, registrationEmail)

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
    var foundUser = findUser(users, inputEmail)

    if (!foundUser || foundUser.password !== inputPassword) throw new Error('Invalid email or password')
}

var updatePassword = (users, authenticatedEmail, currentPassword, newPassword, confirmNewPassword) => {

    var foundUser = findUser(users, authenticatedEmail)

    if (!foundUser)
        throw new Error('User not found')

    if (currentPassword !== authenticatedPassword)
        throw new Error('Invalid current password')

    if (currentPassword === newPassword)
        throw new Error('Current password cannot be the same as new password')

    if (newPassword !== confirmNewPassword)
        throw new Error('New passwords do not match')

    foundUser.password = newPassword
    authenticatedPassword = newPassword
 }


var updateEmail = (users, authenticatedEmail, currentEmail, newEmail, confirmNewEmail) => {

    var user = findUser(users, authenticatedEmail)

    if (!user)
    throw new Error('User not found')

    if (currentEmail !== authenticatedEmail)
    throw new Error('Invalid current email')

    if (currentEmail === newEmail)
    throw new Error('New email cannot be the same as current email')

    if (newEmail !== confirmNewEmail)
    throw new Error('New emails do not match')

    user.email = newEmail
    authenticatedEmail = newEmail
}


var updateAvatar = (authenticatedEmail, avatarUrl) => {

    var user = findUser(users, authenticatedEmail)
    if (!user)
    throw new Error('User not found')

    user.avatar = avatarUrl
} 

