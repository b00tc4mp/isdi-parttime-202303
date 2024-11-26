function registerUser(name, email, password) {
    validateEmail(email)
    validatePassword(password)
    var checkEmail = users.find(user => user.email === email)
    if(checkEmail) {
        throw new Error('Email already registered')
    }
    if(checkEmail !== email) {
        name = name.trim()
        users.push({
            name: name,
            email: email,
            password: password
        })
        return true
    }
}

function authenticateUser(email, password)  {
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

function getUserName(email) {

    var userID = users.map(user => user.email).indexOf(email) 

    if (userID === -1) {
        throw new Error('User or password incorrect')
    }

    if (users[userID].email === email) {
        return users[userID].name
    }
}
function getCurrentUser(email) {
    var userID = users.map(user => user.email).indexOf(currentUserEmail) 
    if (userID !== -1) {
        return email
    }
}

function pushUserDataInForm(email) {
    var userID = users.map(user => user.email).indexOf(email) 
    if (users[userID].email === email) {
        userAccount.querySelector('form.user-info input[name="name"]').value = users[userID].name
        userAccount.querySelector('form.user-info input[name="email"]').value = users[userID].email
        userAccount.querySelector('form.user-password input.current-password').value = users[userID].password
        currentUserEmail = email
    }
}

function updateUserName(user) {
    var newName = userAccount.querySelector('form.user-info input[name="name"]').value
        user.name = newName
}
function updateUserEmail(currentEmail, newEmail) {
    var newEmail = userAccount.querySelector('form.user-info input[name="email"]').value
    var userID = users.map(user => user.email).indexOf(currentEmail)

    // var userSessionChecker = users.email.find(user => user.email === email)
    validateEmail(newEmail)
        if (users[userID].email !== currentEmail && users[userID].email === newEmail){
            throw new Error('Email already registered')
        }
        console.log()
        if (users[userID].email === currentEmail && users[userID].email !== newEmail){
            users[userID].email = newEmail
            userAccount.querySelector('form.user-info input[name="name"]').disabled = true
            userAccount.querySelector('form.user-info input[name="email"]').disabled = true
            userAccount.querySelector('.message').classList.add('success')
            userAccount.querySelector('p.message').innerHTML = 'User info updated!'
        }
 }

function updateUserPassword(email) {
    var userID = users.map(user => user.email).indexOf(email) 
    var currentPassword = userAccount.querySelector('form.user-password input.current-password').value
    var newPassword = userAccount.querySelector('form.user-password input.new-password').value
    var repeatPassword = userAccount.querySelector('form.user-password input.repeat-password').value

    validateNewPassword(currentPassword, newPassword, repeatPassword, users[userID])

    users[userID].password = newPassword
    currentPassword.disabled = true
    newPassword.disabled = true
    repeatPassword.disabled = true
    toggleOffClassInSection(userAccount.querySelector('form.data.user-password .buttons'))
    userAccount.querySelector('p.message').classList.remove('error')
    userAccount.querySelector('p.message').classList.add('success')
    return userAccount.querySelector('p.message').innerHTML = 'Password changed!'
}

function updateUserImage(user) {
    var avatar = userAccount.querySelector('.avatar img.image-profile')
    var imageInput = userAccount.querySelector('form.user-info input[name="file"]')
    user.imageProfile = avatar.src
    var avatar = userAccount.querySelector('.avatar img.image-profile').classList.remove('hidden')
    var avatarHeader = menuHeader.querySelector('.avatar img.image-profile').classList.remove('hidden')
    imageInput.value = ""
}

function logOut() {
    currentUserEmail = ''
    toggleOffClassInSection(userAccount)
    deleteClassOnContainer(loginPage, 'off')
    deleteClassOnContainer(bodyPage, 'logged-in')
}

