function addNewUser(name, email, password) {
    users.push({
        name: name,
        email: email,
        password: password,
        })
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

function getLoggedUser(email) {
    
    // no aportar tot el user, conte info delicada com el password, podriem tornar nomes nom i mail 20230327 2004
    
        for (var i = 0; i < users.length; i++) {
            var user = users[i]
    
            if (user.email === email) {
                loggedUser = {
                    name: user.name,
                    email: user.email
                }
    
                break
            }
        }
    
        //faltaria if de seguretat per si no es troba el user
    
        return true
    }

function confirmUser(email) {
    
    for (var i = 0; i < users.length; i++) {
        var user = users[i]

        if (user.email === email) {
            return false
        }
    }

    return true
}

function confirmPasswordCharacters(password) {

    if (password.length < 4) {
        return false
    } 
    
    if (password.search(/[a-z]/) < 0) {
        return false
    }
    
    if(password.search(/[A-Z]/) < 0) {
        return false
    }
    
    if (password.search(/[0-9]/) < 0) {
        return false
    }

    return true
}

function confirmSamePassword(password, confirmedPassword) {
    if (password !== confirmedPassword) {
        return false
    }

    return true
}

function showHidePassword() {
    var password = loginPage.querySelector('.login__password')

    if (password.type === 'password') {
        password.type = 'text'
    } else {
        password.type = 'password'
    }
}