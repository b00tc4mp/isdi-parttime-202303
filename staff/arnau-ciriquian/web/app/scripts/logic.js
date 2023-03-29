function addNewUser(name, email, password, passwordConfirm) {
    validateName(name)
    validateEmail(email)

    var foundUser = findUserByEmail(email)
    if (foundUser) throw new Error ('user already exists')
    
    validateNewPassword(password)
    validatePasswordConfirm(password, passwordConfirm)
    
    users.push({
        name: name,
        email: email,
        password: password,
        })
}

function authenticateUser(email, password) {
    validateEmail(email)
    validatePassword(password)

    var foundUser = findUserByEmail(email)
    if (!foundUser) throw new Error('user not found')
    if (foundUser.password !== password) throw new Error('wrong password')
}

function getLoggedUser(email) {
    validateEmail(email)
    
    var foundUser = findUserByEmail(email)
    if(!foundUser) throw new Error('user not found')

    var user = {
        name: foundUser.name,
        email: foundUser.email
    }

    loggedUserName = foundUser.name
    
    return user
}

function updateUserPassword(email, password, newPassword, newPasswordConfirmation) {
    var foundUser = findUserByEmail(email)
    if (!foundUser) throw new Error('user not found')
    if (password !== foundUser.password) throw new Error('old password is not correct')

    validateNewPassword(newPassword, 'new password')
    if (newPassword === password) throw new Error('new password is the same as old password')
    validatePasswordConfirm(newPassword, newPasswordConfirmation, 'new password confirmation', 'new password')

    foundUser.password = newPassword
}

function updateUserEmail(email, newEmail, newEmailConfirmation, password) {
    var foundUser = findUserByEmail(email)
    var newEmailUserFound = findUserByEmail(newEmail)
    
    if (email !== authenticatedEmail) throw new Error('email does not correspond to acount email')
    if (!foundUser) throw new Error('user not found')
    if (email !== foundUser.email) throw new Error('email does not correspond to actual email')
    if (!newEmail.match(/\S+@\S+\.\S+/)) throw new Error('new email is not a valid adress')
    if (newEmailUserFound) throw new Error('new email already registered')
    if (newEmail !== newEmailConfirmation) throw new Error('new email confirmation is different than new email')
    if (password !== foundUser.password) throw new Error('incorrect password')
    
    foundUser.email = newEmail
    authenticatedEmail = newEmail
}

function updateUsername(email, oldUsername, newUsername, password) {
    var foundUser = findUserByEmail(email)
    if (!foundUser) throw new Error('user not found')

    validateName(oldUsername, 'old username')
    if (oldUsername !== foundUser.name) throw new Error('old username is not correct')

    validateName(newUsername, 'new username')
    if (newUsername === oldUsername) throw new Error('new username is equal to old username')

    if (password !== foundUser.password) throw new Error('password is not correct')

    foundUser.name = newUsername
}

function showHidePassword() {
    var password = loginPage.querySelector('.login__password')

    if (password.type === 'password') {
        password.type = 'text'
    } else {
        password.type = 'password'
    }
}