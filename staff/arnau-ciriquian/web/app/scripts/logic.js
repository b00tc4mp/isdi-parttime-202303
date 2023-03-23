function registerUser(name, email, password) {
    var foundUser

    for (var i = 0; i < users.length; i++) {
        var user = users[i]

        if (user.email === email) {
            foundUser = user

            break
        }
    }

    if (!foundUser) {
        return false
    }

    users.push({
        name: name,
        email: email,
        password: password,
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

    if (!foundUser || foundUser.password !== password) {
        return false
    }

    return true
}