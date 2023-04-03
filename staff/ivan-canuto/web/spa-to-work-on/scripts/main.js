var registerPage = document.querySelector('.register')
var loginPage = document.querySelector('.login')
var homePage = document.querySelector('.home')
var authenticatedEmail;
var profilePanel = homePage.querySelector('.profile')
var changePasswordForm = profilePanel.querySelector('.change-password')
// var changeEmailForm = profilePanel.querySelector('.change-email')
var changeAvatarForm = profilePanel.querySelector('.change-avatar')
var avatarImage = homePage.querySelector('.avatar-image')
var avatarPassword = changeAvatarForm.querySelector('input[name="password')
var avatarUrl = changeAvatarForm.querySelector('input[name="avatarUrl')
avatarUrl.value = avatarImage.src

registerPage.querySelector('form').onsubmit = function (event) {
    event.preventDefault();

    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
        registerUser(name, email, password);
    
        addOffClass(registerPage)
        removeOffClass(loginPage)
        registerPage.querySelector('input[name="name"]').value = ''
        registerPage.querySelector('input[name="email"]').value = ''
        registerPage.querySelector('input[name="password"]').value = ''

    } catch (error) {
        if (error.name === 'Error') {
            alert(error.message);
        } else {
            alert('Sorry, something went wrong.')
            console.log(error);
        }
    }
}

loginPage.querySelector('form').onsubmit = function (event) {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
        authenticateUser(email, password);

        authenticatedEmail = email;

        // This is to get only the username and the user's email.
        let user = retrieveUser(authenticatedEmail);
        
        homePage.querySelector('a').textContent = user.name;
        avatarImage.src = user.avatar
        
        addOffClass(loginPage)
        removeOffClass(homePage)
        loginPage.querySelector('input[name="email"]').value = ''
        loginPage.querySelector('input[name="password"]').value = ''

    } catch (error) {
        if (error.name === 'Error') {
            alert(error.message);
        } else {
            alert('Sorry, something went wrong.')
            console.log(error);
        }
    }
}

registerPage.querySelector('a').onclick = function (event) {
    event.preventDefault()

    addOffClass(registerPage)
    removeOffClass(loginPage)
}

loginPage.querySelector('a').onclick = function (event) {
    event.preventDefault()

    addOffClass(loginPage)
    removeOffClass(registerPage)
}

homePage.querySelector('.logout-button').onclick = function (event) {
    event.preventDefault()

    addOffClass(homePage)
    removeOffClass(loginPage)
    if(!profilePanel.classList.contains('off')) addOffClass(profilePanel);
}

homePage.querySelector('a').onclick = function (event) {
    event.preventDefault()

    profilePanel.classList.toggle('off')
}

// changeEmailForm.onsubmit = function (event) {
//     event.preventDefault();

//     let email = event.target.email.value;
//     let newEmail = event.target.newEmail.value;
//     let newEmailComfirm = event.target.newEmailConfirm.value;
//     let password = event.target.password.value;

//     try {
//         updateUserEmail(email, newEmail, newEmailComfirm, password)

//         profilePanel.classList.add('off')
//         changeEmailForm.querySelector('input[name="email"]').value = ''
//         changeEmailForm.querySelector('input[name="newEmail"]').value = ''
//         changeEmailForm.querySelector('input[name="newEmailConfirm"]').value = ''
//         changeEmailForm.querySelector('input[name="password"]').value = ''

//         alert('Email updated.')

//     } catch (error) {
//         alert(error.message);
//     }
// }

changePasswordForm.onsubmit = function (event) {
    event.preventDefault();

    let password = event.target.password.value;
    let newPassword = event.target.newPassword.value;
    let newPasswordComfirm = event.target.newPasswordConfirm.value;

    try {
        updateUserPassword(authenticatedEmail, password, newPassword, newPasswordComfirm)

        addOffClass(profilePanel)
        changePasswordForm.querySelector('input[name="password"]').value = ''
        changePasswordForm.querySelector('input[name="newPassword"]').value = ''
        changePasswordForm.querySelector('input[name="newPasswordConfirm"]').value = ''
        alert('Password updated.')


    } catch (error) {
        if (error.name === 'Error') {
            alert(error.message);
        } else {
            alert('Sorry, something went wrong.')
            console.log(error);
        }
    }
}

changeAvatarForm.onsubmit = function (event) {
    event.preventDefault();

    let newAvatarUrl = event.target.avatarUrl.value;
    let password = event.target.password.value;

    try {
        updateUserAvatar(authenticatedEmail, newAvatarUrl, password)

        addOffClass(profilePanel)
        avatarPassword.value = ''
        alert('Avatar updated.')

    } catch (error) {
        if (error.name === 'Error') {
            alert(error.message);
        } else {
            alert('Sorry, something went wrong.')
            console.log(error);
        }
    }
}