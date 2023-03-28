function registerUser(name, email, password) {
    if (typeof name !== 'string') throw new Error('name is not a string')
    if (!name.length) throw new Error('name is empty')
    if (typeof email !== 'string') throw new Error('email is not an string')
    if (!email.length) throw new Error('email is empty')
    if (typeof password !== 'string') throw new Error('password is not a string')
    if (!password.length) throw new Error('password is empty')
    // TODO add more input validation

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
    if (typeof email !== 'string') throw new Error('email is not an string')
    if (!email.length) throw new Error('email is empty')
    if (typeof password !== 'string') throw new Error('password is not a string')
    if (!password.length) throw new Error('password is empty')
    // TODO add more input validation

    var foundUser = findUserByEmail(email)

    if (!foundUser)
        throw new Error('user not found')

    if (foundUser.password !== password)
        throw new Error('wrong password')
}

function retrieveUser(email) {
    if (typeof email !== 'string') throw new Error('email is not an string')
    if (!email.length) throw new Error('email is empty')

    var foundUser = findUserByEmail(email)

    if (!foundUser)
        throw new Error('user not found')

    var user = {
        name: foundUser.name,
        email: foundUser.email
    }

    return user
}

function updateUserPassword(email, password, newPassword, newPasswordConfirm) {
    // TODO add more input validation

    var foundUser = findUserByEmail(email)

    if (!foundUser)
        return false

    if (password !== foundUser.password)
        return false

    if (newPassword !== newPasswordConfirm)
        return false

    if (newPassword === password)
        return false

    foundUser.password = newPassword

    return true
}