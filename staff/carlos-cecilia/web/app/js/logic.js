function registerUser (name, email, password) {
    var foundUser

    for (var i =0; i < users.length; i++) {
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



const authenticateUser = (email, password) => {

    var foundUser

    for (var i = 0; i < users.length; i++) {
        var user = users[i]

        if (user.email === email) {
            foundUser = user
            break
        }
    }

    if (!foundUser && foundUser.password !== password) {
        return false
    } else {    
        return true
    }
}

const checkPasswordStrength = (password) => {

    var strength = 0;
    var tips = "";

    if (password.length < 8) {
        tips += "Tu contraseña es muy corta" 
    } else {
        strength += 1;
    }

    if (password.match(/[a-z]/) & password.match(/[A-Z]/)) {
        strength += 1;
       
    } else {
        tips += "Intenta utilizar mayúsculas y minúsculas";
    }   
    if (password.match(/\d/)) {
        strength += 1;
    
    } else {
        tips += "Intenta utilizar por lo menos un número"
    }


}

function retrieveUser(email) {

    var foundUser
    
    for(var i=0; i < users.length; i++) {
        var user = users[i]

        if ( user.email === email) {
            foundUser = user
            break
        }
    }
    if(!foundUser)

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
    // TODO implement me

    var foundUser
    
    for(var i = 0; i < users.length; i++) {
        var user = users[i]

        if (user.email === email) {
            foundUser = user

            break
        }
    }
    debugger
    if(!foundUser)
    return false

    if (password !== foundUser.password)
    return false

    if(newPassword !== NewPasswordConfirm)
    return false

    if(newPassword === password)
    return false

    foundUser.password = newPassword

    return true

}