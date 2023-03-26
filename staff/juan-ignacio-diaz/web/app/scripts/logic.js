function registerUser (username, email, password) {
    if (username==="") 
        return 2
    else if (email.includes("@") == false) 
        return 3
    else if (password.length<8) 
        return 4
    
    for (var i=0; i<users.length;i++){
        var user=users[i]
        if (user.email === email) {
            return 0
        }
    }

    users.push ({
        name: username,
        email: email,
        password: password
    })
    return 1
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
}

function updateUserPassword(email, password, newPassword, newPasswordConfirm) {

    if  (newPassword === password)
        return 2
    else if (newPassword.length < 8)
        return 3
    else if (newPassword !== newPasswordConfirm)
        return 4

    for (var i = 0; i < users.length; i++) {
        var user = users[i]

        if (user.email === email) {
            user.password = newPassword

            break
        }
    }

    return 1
}

function nameEmail (email) {
    for (var i = 0; i < users.length; i++) {
        var user = users[i]

        if (user.email === email) {
            return user.name
        }
    }
}