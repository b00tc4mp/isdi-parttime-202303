function confirmUser(email) {
    var foundUser

    for (var i = 0; i < users.length; i++) {
        var user = users[i]

        if (user.email === email) {
            foundUser = user

            break
        }
    }

/*  original de la classe edl dia 20230323, crec que va sense exclamació
    if (!foundUser) {
        return false
    }
*/

    if (foundUser) {
        return false
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
    
    for (var i = 0; i < users.length; i++) {
        var user = users[i]

        if (user.email === email) {
            loggedUser = user

            break
        }
    }

    return true
}