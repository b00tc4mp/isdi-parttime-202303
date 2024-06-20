function registerUser(registerName, registerEmail, registerPassword) {
    debugger
    var foundUser
    var registerConfirmedPassword = registerPage.querySelector('input[name=confirm-password]').value 

    for(var i = 0; i < users.length; i++) {
        var user = users[i]

        if (user.email === registerEmail) {
            foundUser = false
            break
        } else {
            foundUser = true
        }
    }

    if (!foundUser) 
        return false
    
    if (registerName !== '' && registerEmail !== '' && registerPassword.length >= 6 && registerPassword === registerConfirmedPassword) {
        users.push({
            name: `${registerName}`,
            email: `${registerEmail}`,
            password: `${registerPassword}`
        })
        registerPage.classList.add('off')
        loginPage.classList.remove('off')
        return true
    } else alert('Los datos introducidos no son correctos')   
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

function updateUserPassword(email, password, newPassword, newPasswordConfirm) {

}

function loginGreeting(registerEmail, registerName) {
    
}

//TODO implement me
