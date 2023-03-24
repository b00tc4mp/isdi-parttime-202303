function registerUser(name, email, password) {
    var foundUser

    for(var i = 0; i < users.length; i++) {
        var user = users[i]

        if (user.email == email) {
            foundUser = user

            break
        }
    }

    if (!foundUser) {
        return false
    } else {
        if (registerName !== '' && registerEmail !== '' && registerPassword.length >= 6 && registerPassword === registerConfirmedPassword) {
            users.push({
                name: `${registerName}`,
                email: `${registerEmail}`,
                password: `${registerPassword}`
            })
            registerPage.classList.add('off')
            loginPage.classList.remove('off')
        } else alert('Los datos introducidos no son correctos')   
    }
}

function authenticateUser(email, password) {
    var foundUser
    for(var i = 0; i < users.length; i++) {
        var user = users[i]

        if (user.email == email) {
            foundUser = user
            break
        }
    }

    if (!foundUser || foundUser.password !== password)
        return false
        
    return true
}
