var registerPage = document.querySelector(".register")
var loginPage = document.querySelector(".login")
var homePage = document.querySelector(".home")
var authenticatedEmail

registerPage.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault()

    registerPage.querySelector("input[name=name]").classList.remove("imput-highlight")
    registerPage.querySelector("input[name=email]").classList.remove("imput-highlight")
    registerPage.querySelector("input[name=password]").classList.remove("imput-highlight")

    var username = registerPage.querySelector("input[name=name]").value
    var email = registerPage.querySelector("input[name=email]").value
    var password = registerPage.querySelector("input[name=password]").value

    var result = registerUser(username, email, password)

    if (result === 2) {
        alert("the name is empty")
        registerPage.querySelector("input[name=name]").focus()
        registerPage.querySelector("input[name=name]").classList.add("imput-highlight")
    }
    else if (result === 3) { 
        alert("the email is wrong")
        registerPage.querySelector("input[name=email]").focus()
        registerPage.querySelector("input[name=email]").classList.add("imput-highlight")
    }
    else if (result === 4) { 
        alert("password must be greater than eight characters")
        registerPage.querySelector("input[name=password]").focus()
        registerPage.querySelector("input[name=password]").classList.add("imput-highlight")
    }
    else if (result === 0) { 
        alert('user already exists')
        registerPage.querySelector("input[name=email]").focus()
        registerPage.querySelector("input[name=email]").classList.add("imput-highlight")
    }
    else { 
        registerPage.classList.add("off")
        loginPage.classList.remove("off")

        registerPage.querySelector("input[name=name]").value = ""
        registerPage.querySelector("input[name=email]").value = ""
        registerPage.querySelector("input[name=password]").value = ""
    }
})

loginPage.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault()

    var email = loginPage.querySelector("input[name=email]").value
    var password = loginPage.querySelector("input[name=password]").value

    var result = authenticateUser(email, password)

    if (result === false) 
        alert("wrong email or password")
    else {
       
        loginPage.classList.add("off")
        loginPage.querySelector("input[name=password]").value = ""

        openSession (email)
    }
})

registerPage.querySelector("a").addEventListener("click", function (event) {
    event.preventDefault()

    registerPage.classList.add("off")
    loginPage.classList.remove("off")
})

loginPage.querySelector("a").addEventListener("click", function (event) {
    event.preventDefault()

    loginPage.classList.add("off")
    registerPage.classList.remove("off")
})

homePage.querySelector("a[name=profile]").addEventListener("click", function (event) {
    event.preventDefault()

    homePage.querySelector(".home-password").classList.remove("off")
})

homePage.querySelector(".home-password").querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault()

    var formUpdatePasword = homePage.querySelector(".home-password").querySelector("form")

    formUpdatePasword.querySelector("input[name=password]").classList.remove("imput-highlight")
    formUpdatePasword.querySelector("input[name=newPassword]").classList.remove("imput-highlight")
    formUpdatePasword.querySelector("input[name=newPasswordConfirm]").classList.remove("imput-highlight")

    var password = formUpdatePasword.querySelector("input[name=password]").value
    var newPassword = formUpdatePasword.querySelector("input[name=newPassword]").value
    var newPasswordConfirm = formUpdatePasword.querySelector("input[name=newPasswordConfirm]").value

    var result = updateUserPassword(authenticatedEmail, password, newPassword, newPasswordConfirm)

    if (result === 2) {
        alert("the new password is equal to the old password")
        formUpdatePasword.querySelector("input[name=newPassword]").focus()
        formUpdatePasword.querySelector("input[name=password]").classList.add("imput-highlight")
        formUpdatePasword.querySelector("input[name=newPassword]").classList.add("imput-highlight")
    }
    else if (result === 3) { 
        alert("the new password must be greater than eight characters")
        formUpdatePasword.querySelector("input[name=newPassword]").focus()
        formUpdatePasword.querySelector("input[name=newPassword]").classList.add("imput-highlight")
    }
    else if (result === 4) { 
        alert("the confirm password is different than then new password")
        registerPage.querySelector("input[name=newPasswordConfirm]").focus()
        registerPage.querySelector("input[name=newPasswordConfirm]").classList.add("imput-highlight")
    }
    else {
        alert("the password is update")

        homePage.querySelector(".home-password").classList.add("off")
        formUpdatePasword.querySelector("input[name=password]").value = ""
        formUpdatePasword.querySelector("input[name=newPassword]").value = ""
        formUpdatePasword.querySelector("input[name=newPasswordConfirm]").cvalue = ""
    }
})

homePage.querySelector("button[name=logout]").addEventListener("click", function(event){

    homePage.classList.add("off")
    closeSession()
    
})

function openSession(email) {
    authenticatedEmail = email 

    homePage.classList.remove("off")
    homePage.querySelector(".name").innerText  = "Helo " +nameEmail(email)
}

function closeSession() {
    authenticatedEmail = ""

    homePage.querySelector(".name").innerText  = ""

    loginPage.classList.remove("off")
}
