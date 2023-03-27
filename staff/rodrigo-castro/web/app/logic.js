// logic

const checkNewUser = (userEmail) => {
    const userFound = users.find(user => user.email === userEmail)
    if(userFound === undefined){
        return false
    } else {
        return true
    }
}

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

const changePassword = (userLogged, users) => {
    homePage.querySelector('.red-text').textContent = ''
    var previousPassword = homePage.querySelector('.previous-password').value

    if(previousPassword !== userLogged.password){
        homePage.querySelector('.red-text').textContent = 'Your password is incorrect'
        return
    }

    var newPassword = homePage.querySelector('.new-password').value

    if(newPassword.length < 8){
        homePage.querySelector('.red-text').textContent = 'Password must be at least 8 characters long'
        return
    }

    if(newPassword === previousPassword){
        homePage.querySelector('.red-text').textContent = 'New password must be different than previous'
        return
    }

    var newPasswordRepeated = homePage.querySelector('.repeat-new-password').value

    if(newPasswordRepeated !== newPassword){
        homePage.querySelector('.red-text').textContent = `New passwords don't match`
        return
    }

    userLogged.password = newPassword
    users.forEach(user => {
        if(user.email === userLogged.email){
            user.password = userLogged.password
        }
    })
    homePage.querySelector('.red-text').textContent = 'Password succesfully changed'
    homePage.querySelector('.red-text').classList.add('green-text')
}
