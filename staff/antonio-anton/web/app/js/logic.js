function registerUser(name, email, password) {
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

    users.push({
        name: name,
        email: email,
        password: btoa(password)
    })

    return true
}

function authenticateUser(email, password) {
    var foundUser
    if (typeof email !== 'string') throw new Error('email is not an string')
    if (!email.length) throw new Error('email is empty')
    if (typeof password !== 'string') throw new Error('password is not a string')
    if (!password.length) throw new Error('password is empty')

    for (var i = 0; i < users.length; i++) {
        var user = users[i]
        
        console.log(user.email )

        if (user.email === email) {
            foundUser = user

            break
        }
    }

    if (!foundUser || user.password !== btoa(password))
        return false

    return true

}  

function updateUserPassword(email, password, newPassword, newPasswordConfirm) {
    // TODO implement me
}

