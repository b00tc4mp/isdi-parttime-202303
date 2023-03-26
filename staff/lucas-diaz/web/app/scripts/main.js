// presentation
const registerPage = document.querySelector(".register");

const logInPage = document.querySelector(".login")
const logInForm = document.querySelector(".login form");
const loginRegistrationAnchor = document.querySelector(".login .register-anchor");

const homePage = document.querySelector(".home");
const logOutButton = document.querySelector(".log-out-button");
const welcomeMessage = document.querySelector(".welcome-msj");

const successRegisterAdivice = document.querySelector(".success-advice-p");
const failRegisterAdvice = document.querySelector(".register .fail-advice-p");
const failLogInAdvice = document.querySelector(".login .fail-advice-p")
var authenticatedEmail


registerPage.querySelector("form").addEventListener('submit', function (event) {
    event.preventDefault();
    
    var temporalUser = {
        name: registerPage.querySelector("input[type=text]").value,
        email: registerPage.querySelector("input[type=email]").value,
        password: registerPage.querySelector("input[type=password]").value
    }
    var result = registerUser(temporalUser);

    if(!result){
        failRegisterAdvice.classList.remove("off");
        set3SecondsAdvice(failRegisterAdvice,"off")
        cleanUser(registerPage);
    } else {
        registerPage.classList.add("off");
        logInPage.classList.remove("off");
        successRegisterAdivice.classList.remove("off");
        set3SecondsAdvice(successRegisterAdivice, "off")
    }
})

logInForm.addEventListener('submit', function (event) {
    event.preventDefault();

    var email = logInPage.querySelector('input[name=email]').value
    var password = logInPage.querySelector('input[name=password]').value
    var result = authenticateUser(email,password);

    if (!result) {
        failLogInAdvice.classList.remove("off");
        set3SecondsAdvice(failLogInAdvice,"off")
    } else {
        authenticatedEmail = email;
        addUserNameInHeader(authenticatedEmail);

        logInPage.classList.add("off");
        homePage.classList.remove("off");
    }
})

loginRegistrationAnchor.addEventListener("click", function (event){
    event.preventDefault();
    logInPage.classList.add("off");
    registerPage.classList.remove("off");
})
logOutButton.addEventListener("click", () => {
    homePage.classList.add("off");
    logInPage.classList.remove("off");
    authenticatedEmail = "";
    resetUserNameInHeader();
})


// TODO add link to profile in home page and open a profile panel
// TODO add a form in profile panel to allow the user to update his/her password (asking current password, and new password and new password confirmation)