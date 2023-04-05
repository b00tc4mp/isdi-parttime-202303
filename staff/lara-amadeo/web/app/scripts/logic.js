import { validateEmail, validatePassword, validateAvatarFormat } from "./validators.js"
import { users } from "./data.js"

export var checkUserExists = (registrationName, registrationEmail, registrationPassword,registrationRepPassword) => {

    validateEmail(registrationEmail)
    validatePassword(registrationPassword)
    validatePassword(registrationRepPassword, 'new password')

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

export var checkCredentials = (inputEmail, inputPassword) => {
    var foundUser = findUser(users, inputEmail)

    if (!foundUser || foundUser.password !== inputPassword) throw new Error('Invalid email or password')
}

export var updatePassword = (users, authenticatedEmail, currentPassword, newPassword, confirmNewPassword) => {

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


export var updateEmail = (users, authenticatedEmail, currentEmail, newEmail, confirmNewEmail) => {

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


export var updateAvatar = (authenticatedEmail, avatarUrl) => {

    validateAvatarFormat(avatarUrl)
    var user = findUser(users, authenticatedEmail)
    if (!user)
    throw new Error('User not found')

    user.avatar = avatarUrl
} 

var findUser = (users, authenticatedEmail) => {
    return users.find(user => user.email === authenticatedEmail)
 }