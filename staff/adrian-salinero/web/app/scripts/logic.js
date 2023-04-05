function registerUser(name, email, password) {
    validateName(name)
    validateEmail(email)
    validatePassword(password)

    var foundUser = findUserByEmail(email)

    if (foundUser)
        throw new Error('user already exists')

    users.push({
        name: name,
        email: email,
        password: password
    })
}

function authenticateUser(email, password) {
    validateEmail(email)
    validatePassword(password)

    var foundUser = findUserByEmail(email)

    if (!foundUser)
        throw new Error('user not found')

    if (foundUser.password !== password)
        throw new Error('wrong password')
}

function retrieveUser(email) {
    validateEmail(email)

    var foundUser = findUserByEmail(email)

    if (!foundUser)
        throw new Error('user not found')

    var user = {
        name: foundUser.name,
        email: foundUser.email
    }

    if (foundUser.avatar)
        user.avatar = foundUser.avatar

    return user
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

    var foundUser = findUserByEmail(email)

    if (!foundUser)
        throw new Error('user not found')

    if (password !== foundUser.password)
        throw new Error('wrong password')

    if (newPassword !== newPasswordConfirm)
        throw new Error('password confirmation mismatch')

    if (newPassword === password)
        throw new Error('new password equals old password')

    foundUser.password = newPassword
}