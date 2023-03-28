function addNewUser(name, email, password, passwordConfirm) {
    if (typeof name !== 'string') throw new Error('name is not a string')
    if (!name.length) throw new Error('name is empty')
    if (typeof email !== 'string') throw new Error('email is not a string')
    if (!email.length) throw new Error('email is empty')
    if (!email.match(/\S+@\S+\.\S+/)) throw new Error('email is not a valid adress')

    var foundUser = findUserByEmail(email)

    if (foundUser) throw new Error ('user already exists')
    if (typeof password !== 'string') throw new Error('password is not a string')
    if(!password.length) throw new Error('password is empty')
    if (typeof passwordConfirm !== 'string') throw new Error('password confirmation is not a string')
    if(!passwordConfirm.length) throw new Error('password confirmation is empty')
    if (password.length < 4) throw new Error('password is shorter than 4 characters')
    if (password.search(/[a-z]/) < 0) throw new Error('password does not include a lowercase')
    if (password.search(/[A-Z]/) < 0) throw new Error('password does not include an uppercase')
    if (password.search(/[0-9]/) < 0) throw new Error('password does not include a number')
    if (password !== passwordConfirm) throw new Error('password confirmation is different than password')
    
    users.push({
        name: name,
        email: email,
        password: password,
        })
}

function authenticateUser(email, password) {
    if (typeof email !== 'string') throw new Error('email is not a string')
    if(!email.length) throw new Error('email is empty')
    if (!email.match(/\S+@\S+\.\S+/)) throw new Error('email is not a valid adress')
    if (typeof password !== 'string') throw new Error('password is not a string')
    if(!password.length) throw new Error('password is empty')

    var foundUser = findUserByEmail(email)

    if (!foundUser) throw new Error('user not found')

    if (foundUser.password !== password) throw new Error('wrong password')
}

function getLoggedUser(email) {
    if (typeof email !== 'string') throw new Error('email is not an string')
    if (!email.length) throw new Error('email is empty')
    
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

    if(!foundUser) throw new Error('user not found')
    if(password !== foundUser.password) throw new Error('old password is not correct')
    if (typeof newPassword !== 'string') throw new Error('new password is not a string')
    if(!newPassword.length) throw new Error('new password is empty')
    if (typeof newPasswordConfirmation !== 'string') throw new Error('new password confirmation is not a string')
    if(!newPasswordConfirmation.length) throw new Error('new password confirmation is empty')
    if (newPassword.length < 4) throw new Error('new password is shorter than 4 characters')
    if (newPassword.search(/[a-z]/) < 0) throw new Error('new password does not include a lowercase')
    if (newPassword.search(/[A-Z]/) < 0) throw new Error('new password does not include an uppercase')
    if (newPassword.search(/[0-9]/) < 0) throw new Error('new password does not include a number')
    if (newPassword !== newPasswordConfirmation) throw new Error('new password confirmation is different than new password')
    if (newPassword === password) throw new Error('new password is the same as old password')

    foundUser.password = newPassword
}

function showHidePassword() {
    var password = loginPage.querySelector('.login__password')

    if (password.type === 'password') {
        password.type = 'text'
    } else {
        password.type = 'password'
    }
}

function updateUserEmail(email, newEmail, newEmailConfirmation) {
    var foundUser = findUserByEmail(email)
    var newEmailUserFound = findUserByEmail(newEmail)

    if (!foundUser) throw new Error('user not found')
    if (email !== foundUser.email) throw new Error('email does not correspond to actual email')
    if (!newEmail.match(/\S+@\S+\.\S+/)) throw new Error('new email is not a valid adress')
    if (newEmailUserFound) throw new Error('new email already registered')
    if (newEmail !== newEmailConfirmation) throw new Error('new email confirmation is different than new email')

    foundUser.email = newEmail
}