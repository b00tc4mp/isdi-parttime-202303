function registerUser(name, email, password) {
    var foundUser

    for (var i = 0; i < users.length; i++) {
        var user = users[i]

        if (user.email === email) {
            foundUser = user

            break
        }
    }

    if (foundUser)
        return false

    users.push({
        name: name,
        email: email,
        password: password
    })

    return true
}

function authenticateUser(email, password) {
    var foundUser

    for (var i = 0; i < users.length; i++) {
        var user = users[i]

        if (user.email === email) {
            foundUser = user

            break
        }
    }

    if (!foundUser || foundUser.password !== password)
        return false

    return true

    // WARN "nice", but not easy to read
    // return (!foundUser || foundUser.password !== password)? false : true
    // return !(!foundUser || foundUser.password !== password) 
}

function retrieveUser(email) {
    var foundUser

    for (var i = 0; i < users.length; i++) {
        var user = users[i]

        if (user.email === email) {
            foundUser = user

            break
        }
    }

    if (!foundUser)
        return false
    else {
        var user = {
            name: foundUser.name,
            email: foundUser.email
        }

        return user
    }
}

function updateUserPassword(email, password, newPassword, newPasswordConfirm) {
    // TODO lookup user in database
    // TODO check user exists
    // TODO check password is correct against user
    // TODO check new password is correct against password confirmation
    // TODO check new password is different from old password
    // TODO udpate user password in database

    var foundUser

    for (var i = 0; i < users.length; i++) {
        var user = users[i]

        if (user.email === email) {
            foundUser = user

            break
        }
    }

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