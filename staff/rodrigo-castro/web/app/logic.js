// logic

const registerNewUser = (users, userName, userEmail, userPassword) => {
    users.push({
        name: userName,
        email: userEmail,
        password: userPassword
    })
}

const findUser = (users, userEmail) => {
    return  users.find(user => user.email === userEmail)
}

const changeEmail = (userLogged, users, event) => {
    var userPreviousEmail = homePage.querySelector('input[name=previous-email]').value
    var userNewEmail = homePage.querySelector('input[name=new-email]').value
    var userPassword = homePage.querySelector('input[name=change-email-pass]').value

    var foundUser = findUser(users, userLogged.email)

    if(userPreviousEmail !== foundUser.email) throw new Error('Email or password incorrect')

    checkNewUser(userNewEmail)

    validateEmail(userNewEmail, emailExpression)

    if(userPassword !== foundUser.password) throw new Error('Email or password incorrect2')

    userLogged.email = userNewEmail
    foundUser.email = userNewEmail
    emailMenuRedText.textContent = 'Email succesfully changed'
    emailMenuRedText.classList.add('green-text')
    changeEmailMenu.querySelector('form').reset()
}

const changePassword = (userLogged, users, changePasswordMenu) => {
    var previousPassword = homePage.querySelector('.previous-password').value
    var foundUser = findUser(users, userLogged.email)
    
    if (previousPassword !== foundUser.password) throw new Error('Your password is incorrect')

    var newPassword = homePage.querySelector('.new-password').value

    if(newPassword.length < 8) throw new Error('Password must be at least 8 characters long')

    if(newPassword === previousPassword) throw new Error('New password must be different than previous')

    var newPasswordRepeated = homePage.querySelector('.repeat-new-password').value

    if(newPasswordRepeated !== newPassword) throw new Error (`New passwords don't match`)

    userLogged.password = newPassword
    foundUser.password = newPassword
    
    changePasswordMenu.querySelector('.red-text').textContent = 'Password succesfully changed'
    changePasswordMenu.querySelector('.red-text').classList.add('green-text')
    changePasswordMenu.querySelector('form').reset()
}

const updateUserAvatar = (userLogged, avatarUrl, avatarImg, changeAvatarForm) => {
    validateEmail(userLogged.email, emailExpression)
    validateUrl(avatarUrl, 'Avatar url')

    var foundUser = findUser(users, userLogged.email)

    if(!foundUser) throw new Error('User not found')

    foundUser.avatar = avatarUrl
    avatarImg.src = foundUser.avatar

    changeAvatarForm.reset()
}

const registerUserFull = (userEmail, userName, emailExpression, userPassword, users) => {
    checkNewUser(userEmail)

    validateName(userName)

    validateEmail(userEmail, emailExpression)

    validatePassword(userPassword)

    registerNewUser(users, userName.trim(), userEmail, userPassword)
}

const goToHomePage = (homePage, foundUser, avatarImg) => {
    homePage.classList.remove('off')
    homePage.querySelector('a[name=my-profile]').textContent =`${foundUser.name}`
    if(foundUser.avatar)
        avatarImg.src = foundUser.avatar
}

const logIn = (foundUser, userPassword, homePage, avatarImg) => {
    if(foundUser === undefined || foundUser.password !== userPassword) throw new Error('Wrong email or password')
    goToHomePage(homePage, foundUser, avatarImg)        
    userLogged = JSON.parse(JSON.stringify(foundUser))
    delete userLogged.password
    // userLogged = Object.assign({}, foundUser) -> otra forma de copiar objetos
}