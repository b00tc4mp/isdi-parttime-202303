function registerUser(name, email, password) {
    var registerUserSuccess
    
    validateEmail(email)
    validatePassword(password)
    var checkEmail = users.find(user => user.email === email)
        if(checkEmail) {
            // registerUserSuccess = false
            throw new Error('Email already registered')
        }
        if(checkEmail !== email) {
            name = name.trim()
            users.push({
                name: name,
                email: email,
                password: password
            })
        }
}

function authenticateUser(email, password)  {
    var checkAuthenticationSuccess
    console.log(email)
    var checkEmail = users.find(user => user.email === email)
    var checkPassword = users.find(user => user.password === password)
    
    if (!checkEmail) {
        throw new Error('User or password incorrect')
    }

    if (!checkPassword) {
        throw new Error('User or password incorrect')
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

function updateUserName(email) {
    var newName = userAccount.querySelector('form.user-info input[name="name"]').value
    var newEmail = userAccount.querySelector('form.user-info input[name="email"]').value
    for(i = 0; i < users.length; i++){
        var currentUser = users[i]
        if (currentUser.name === newName){
            userAccount.querySelector('.update-info p.message').innerHTML = 'Nothing changed'
        }
  
        currentUser.name = newName

        newName.disabled = true
        newEmail.disabled = true
        return userAccount.querySelector('.user-info').classList.add('off') 
    }
}
function updateUserEmail(email) {
    var newName = userAccount.querySelector('form.user-info input[name="name"]').value
    var newEmail = userAccount.querySelector('form.user-info input[name="email"]').value
    var userSessionChecker = users.email.find(user => user.email === email)
    validateEmail(email)
    for(i = 0; i < users.length; i++){
        var currentUser = users[i]
        if (currentUserEmail === newEmail){
            throw new Error('Email already registered')
        }
        if (currentUserEmail === currentUser && currentUser === email){
            throw new Error('Email already registered')
        }
        if (currentUser.email !== newEmail){
            currentUser.email = newEmail
        }

        newName.disabled = true
        newEmail.disabled = true
        userAccount.querySelector('.user-info').classList.add('off')
        userAccount.querySelector('.update-info p.message').innerHTML = 'User info changed!'

    }
}


function updateUserPassword(email) {
    
    var currentUser = users.find(user => user.email === email)
    var currentPassword = userAccount.querySelector('form.user-password input.current-password').value
    var newPassword = userAccount.querySelector('form.user-password input.new-password').value
    var repeatPassword = userAccount.querySelector('form.user-password input.repeat-password').value

    validatePassword(currentPassword, newPassword, repeatPassword, currentUser)

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


// poner trim a todos los inputs
