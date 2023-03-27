function registerUser(name,email, password) {
    var registerUserSuccess
    var checkEmail = users.find(user => user.email === email)
        if(checkEmail) {
            registerUserSuccess = false
            return false
        }
        if(checkEmail !== email) {
            users.push({
                name: name,
                email: email,
                password: password
            })
            registerUserSuccess = true
            return true
        }

}
function authenticateUser(email, password)  {
    var checkAuthenticationSuccess
    var checkEmail = users.find(user => user.email === email)
    var checkPassword = users.find(user => user.password === password)

    if (checkEmail.email !== email || checkPassword.password !== password) {
        checkAuthenticationSuccess = false
    }
    if (checkEmail.email === email && checkPassword.password === password) {
        checkAuthenticationSuccess = true
    }

    if(!checkAuthenticationSuccess) {
        return false
    }
    if (checkAuthenticationSuccess) {
        return true
    }
}

function gerUserName(email) {
    var checkEmail = users.find(user => user.email === email)
    if (checkEmail.email === email) {
        return checkEmail.name
    }

}


function pushUserDataInForm(email) {
    var checkEmail = users.find(user => user.email === email)
    if (checkEmail.email === email) {
        userAccount.querySelector('form.user-info input[name="name"]').value = checkEmail.name
        userAccount.querySelector('form.user-info input[name="email"]').value = checkEmail.email
        userAccount.querySelector('form.user-password input.current-password').value = checkEmail.password
    }
}

function updateUserInfo(email) {
    var currentUser = users.find(user => user.email === email)
    var newName = userAccount.querySelector('form.user-info input[name="name"]').value
    var newEmail = userAccount.querySelector('form.user-info input[name="email"]').value
    console.log('currentUser.name', currentUser.name)
    console.log('currentUser.email', currentUser.email)
    console.log('newName', newName)
    console.log('newEmail', newEmail)
    if (currentUser.name === newName && currentUser.email === newEmail){
        // do nothing
    }
    if (currentUser.name === newName && currentUser.email !== newEmail){
        currentUser.email = newEmail
    }
    if (currentUser.name !== newName && currentUser.email === newEmail){
        currentUser.name = newName
    }
    if (currentUser.name !== newName && currentUser.email !== newEmail){
        currentUser.name = newName
        currentUser.email = newEmail
    }
    newName.disabled = true
    newEmail.disabled = true
    userAccount.querySelector('.user-info').classList.add('off')
    userAccount.querySelector('.update-info p.message').innerHTML = 'User info changed!'
}


function updateUserPassword(email) {
    var currentUser = users.find(user => user.email === email)
    var currentPassword = userAccount.querySelector('form.user-password input.current-password').value
    var newPassword = userAccount.querySelector('form.user-password input.new-password').value
    var repeatPassword = userAccount.querySelector('form.user-password input.repeat-password').value

    console.log(currentUser)
    if(currentPassword !== currentUser.password) {
        userAccount.querySelector('.update-password p.message').classList.add('error')
        return userAccount.querySelector('.update-password p.message').innerHTML = 'Invalid current password'

    }
    if(currentPassword === newPassword) {
        userAccount.querySelector('.update-password p.message').classList.add('error')
        return userAccount.querySelector('.update-password p.message').innerHTML = 'You need to set a new password'

    }
    
    if(newPassword !== repeatPassword) {
        return userAccount.querySelector('.update-password p.message').innerHTML = 'New password does not match'
    }
    
    currentUser.password = newPassword
    currentPassword.disabled = true
    console.log(newPassword)
    newPassword.disabled = true
    repeatPassword.disabled = true
    userAccount.querySelector('.user-password').classList.add('off')
    userAccount.querySelector('.update-password p.message').classList.remove('error')
    userAccount.querySelector('.update-password p.message').classList.add('success')
    console.log(users)
    return userAccount.querySelector('.update-password p.message').innerHTML = 'Password changed!'
}
