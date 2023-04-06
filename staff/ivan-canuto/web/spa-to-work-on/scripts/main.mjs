import { registerUser, authenticateUser, retrieveUser, updateUserPassword, updateUserAvatar } from './logic.mjs'
import { addOffClass, removeOffClass } from './ui.mjs'

const registerPage = document.querySelector('.register')
const loginPage = document.querySelector('.login')
const homePage = document.querySelector('.home')
let authenticatedUserId;
const profilePanel = homePage.querySelector('.profile')
const changePasswordForm = profilePanel.querySelector('.change-password')
// const changeEmailForm = profilePanel.querySelector('.change-email')
const changeAvatarForm = profilePanel.querySelector('.change-avatar')
const avatarImage = homePage.querySelector('.avatar-image')
const avatarPassword = changeAvatarForm.querySelector('input[name="password')
const avatarUrl = changeAvatarForm.querySelector('input[name="avatarUrl')

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
        authenticatedUserId = authenticateUser(email, password);

        // This is to get only the username and the user's email.
        let user = retrieveUser(authenticatedUserId);
        
        homePage.querySelector('a').textContent = user.name;
        avatarImage.src = user.avatar
        
        addOffClass(loginPage)
        removeOffClass(homePage)
        loginPage.querySelector('input[name="email"]').value = ''
        loginPage.querySelector('input[name="password"]').value = ''

    } catch (error) {
        if (error.name === 'Error') {
            alert(error.message);
            console.log(error);
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
    const inputsProfilePanel = profilePanel.querySelectorAll('input')
    inputsProfilePanel.forEach(input => input.value = '')
    avatarUrl.value = avatarImage.src
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
        updateUserPassword(authenticatedUserId, password, newPassword, newPasswordComfirm)

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
        updateUserAvatar(authenticatedUserId, newAvatarUrl, password)

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