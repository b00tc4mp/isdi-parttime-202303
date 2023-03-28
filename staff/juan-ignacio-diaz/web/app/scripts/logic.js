function registerUser (username, email, password) {
    if (username==="") throw new Error("the name is empty", {type: 2})
    if (email.includes("@") == false) throw new Error("the email is wrong", {type: 3})
    if (password.length<8) throw new Error("password must be greater than eight characters", {type: 4})

    var foundUser = findUserByEmail(email)
    
    if (foundUser) throw new Error("user already exists", {type: 0})

    users.push ({
        name: username,
        email: email,
        password: password
    })

}

function authenticateUser(email, password) {
    var foundUser = findUserByEmail(email)

    if (!foundUser || foundUser.password !== password) throw new Error("wrong email or password")
    
    return true 
}

function updateUserPassword(email, password, newPassword, newPasswordConfirm) {
    if (newPassword === password) throw new Error("the new password is equal to the old password", {type: 2})
    if (newPassword.length < 8) throw new Error("the new password must be greater than eight characters", {type: 3})
    if (newPassword !== newPasswordConfirm) throw new Error("the confirm password is different than then new password", {type: 4})

    var foundUser = findUserByEmail(email)

    if (!foundUser) throw new Error("Error to user")
    if (foundUser.password !== newPassword)  throw new Error("Error the pasword is invalid")

    user.password = newPassword

    return true
}

function nameEmail (email) {
    var foundUser = findUserByEmail(email)
    if (!foundUser) throw new Error("Error to user")
   
    return foundUser.name

}