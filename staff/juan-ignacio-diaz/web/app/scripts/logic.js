function registerUser (name, email, password) {
    validateName(name)
    validateEmail(email)
    validatePassword(password)
    
    if (findUserByEmail(email)) 
        throw new Error("user already exists")

    users.push ({
        name: username,
        email: email,
        password: password
    })

}

function authenticateUser(email, password) {
    validateEmail(email)
    validatePassword(password)

    var foundUser = findUserByEmail(email)

    if (!foundUser || foundUser.password !== password) 
        throw new Error("wrong email or password")
}

function updateUserAvatar(email, avatar) {
    validateEmail(email)
    validateUrl(avatar, 'avatar url')

    var foundUser = findUserByEmail(email)

    if (!foundUser)
        throw new Error('user not found')

    foundUser.avatar = avatar
}


function updateUserPassword(email, password, newPassword, newPasswordConfirm) {
    validateEmail(email)
    validatePassword(password)
    validatePassword(newPassword, 'new password')
    validatePassword(newPasswordConfirm, 'new password confirm')

    if (newPassword === password) throw new Error("the new password is equal to the old password", {cause: "newPassword"})

    if (newPassword !== newPasswordConfirm) throw new Error("the confirm password is different than then new password", {cause: "newPasswordConfirm"})

    var foundUser = findUserByEmail(email)

    if (!foundUser) throw new Error("Error to user")
    if (foundUser.password !== password)  throw new Error("Error the pasword is invalid", {cause: "password"})

    foundUser.password = newPassword
}

function retrieveUser (email) {
    validateEmail(email)

    var foundUser = findUserByEmail(email)
    if (!foundUser) throw new Error("Error to user")
   
    var user = {
        name: foundUser.name,
        email: foundUser.email
    }

    return user

}