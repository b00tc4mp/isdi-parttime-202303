var registerPage = document.querySelector('.register')
var loginPage = document.querySelector('.login')
var homePage = document.querySelector('.home')
var authenticatedEmail;
var profilePanel = homePage.querySelector('.profile')
var changePasswordForm = profilePanel.querySelector('.change-password')
var changeEmailForm = profilePanel.querySelector('.change-email')

registerPage.querySelector('form').onsubmit = function (event) {
    event.preventDefault();

    const name = registerPage.querySelector('input[name="name"]').value;
    const email = registerPage.querySelector('input[name="email"]').value;
    const password = registerPage.querySelector('input[name="password"]').value;

    try {
        registerUser(name, email, password);
    
        registerPage.classList.add('off');
        loginPage.classList.remove('off');
    } catch (error) {
        alert(error.message);
    }
}

loginPage.querySelector('form').onsubmit = function (event) {
    event.preventDefault();

    const email = loginPage.querySelector('input[name="email"]').value;
    const password = loginPage.querySelector('input[name="password"]').value;

    try {
        authenticateUser(email, password);

        authenticatedEmail = email;

        // This is to get only the username and the user's email.
        let foundUser = retrieveUser(authenticatedEmail);
        
        homePage.querySelector('p').textContent = `Hello, ${foundUser.name}`;
        
        loginPage.classList.add('off');
        homePage.classList.remove('off');

    } catch (error) {
        alert(error.message);
    }
}

registerPage.querySelector('a').onclick = function (event) {
    event.preventDefault()

    registerPage.classList.add('off')
    loginPage.classList.remove('off')
}

loginPage.querySelector('a').onclick = function (event) {
    event.preventDefault()

    loginPage.classList.add('off')
    registerPage.classList.remove('off')
}

homePage.querySelector('button').onclick = function (event) {
    event.preventDefault()

    homePage.classList.add('off')
    loginPage.classList.remove('off')
    if(!profilePanel.classList.contains('off')) profilePanel.classList.add('off');
}

homePage.querySelector('a').onclick = function (event) {
    event.preventDefault()

    profilePanel.classList.toggle('off')
}

// TODO add a form in profile panel to allow the user to update his/her password (asking current password, and new password and new password confirmation)

changeEmailForm.onsubmit = function (event) {
    event.preventDefault();

    let email = changeEmailForm.querySelector('input[name="email"]').value;
    let newEmail = changeEmailForm.querySelector('input[name="newEmail"]').value;
    let newEmailComfirm = changeEmailForm.querySelector('input[name="newEmailConfirm"]').value;

    try {
    updateUserEmail(email, newEmail, newEmailComfirm)

    profilePanel.classList.add('off')
    alert('email updated')

    } catch (error) {
        alert(error.message);
    }
}

changePasswordForm.onsubmit = function (event) {
    event.preventDefault();

    let password = profilePanel.querySelector('input[name="password"]').value;
    let newPassword = profilePanel.querySelector('input[name="newPassword"]').value;
    let newPasswordComfirm = profilePanel.querySelector('input[name="newPasswordConfirm"]').value;

    try {
    updateUserPassword(authenticatedEmail, password, newPassword, newPasswordComfirm)

    profilePanel.classList.add('off')
    alert('password updated')

    } catch (error) {
        alert(error.message);
    }
}