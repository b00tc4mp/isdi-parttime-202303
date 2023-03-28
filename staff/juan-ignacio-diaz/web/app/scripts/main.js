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

    try {
        registerUser(username, email, password)

        registerPage.classList.add("off")
        loginPage.classList.remove("off")

        registerPage.querySelector("input[name=name]").value = ""
        registerPage.querySelector("input[name=email]").value = ""
        registerPage.querySelector("input[name=password]").value = ""
    }
    catch (error) {
        alert(error.message)

        if (error.type === 0) { 
            registerPage.querySelector("input[name=email]").focus()
            registerPage.querySelector("input[name=email]").classList.add("imput-highlight")
        }

        else if (error.type === 2) {
            registerPage.querySelector("input[name=name]").focus()
            registerPage.querySelector("input[name=name]").classList.add("imput-highlight")
        }
        else if (error.type === 3) { 
            registerPage.querySelector("input[name=email]").focus()
            registerPage.querySelector("input[name=email]").classList.add("imput-highlight")
        }
        else if (error.type === 4) { 
            registerPage.querySelector("input[name=password]").focus()
            registerPage.querySelector("input[name=password]").classList.add("imput-highlight")
        }
    }    
})

loginPage.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault()

    var email = loginPage.querySelector("input[name=email]").value
    var password = loginPage.querySelector("input[name=password]").value

    try {
        var result = authenticateUser(email, password)

        loginPage.classList.add("off")
        loginPage.querySelector("input[name=password]").value = ""

        openSession (email)
    }
    catch(error) {
        alert(error.message)
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

    homePage.querySelector(".home-profile").classList.remove("off")
})

homePage.querySelector(".home-profile").querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault()

    var formUpdatePasword = homePage.querySelector(".home-profile").querySelector("form")

    formUpdatePasword.querySelector("input[name=password]").classList.remove("imput-highlight")
    formUpdatePasword.querySelector("input[name=newPassword]").classList.remove("imput-highlight")
    formUpdatePasword.querySelector("input[name=newPasswordConfirm]").classList.remove("imput-highlight")

    var password = formUpdatePasword.querySelector("input[name=password]").value
    var newPassword = formUpdatePasword.querySelector("input[name=newPassword]").value
    var newPasswordConfirm = formUpdatePasword.querySelector("input[name=newPasswordConfirm]").value

    
    try {
        updateUserPassword(authenticatedEmail, password, newPassword, newPasswordConfirm)
        
        alert("the password is update")

        homePage.querySelector(".home-profile").classList.add("off")

        formUpdatePasword.querySelector("input[name=password]").value = ""
        formUpdatePasword.querySelector("input[name=newPassword]").value = ""
        formUpdatePasword.querySelector("input[name=newPasswordConfirm]").cvalue = ""
    }
    catch (error) {

        alert(error.message)

        if (error.type === 2) {
            formUpdatePasword.querySelector("input[name=newPassword]").focus()
            formUpdatePasword.querySelector("input[name=password]").classList.add("imput-highlight")
            formUpdatePasword.querySelector("input[name=newPassword]").classList.add("imput-highlight")
        }
        else if (error.type === 3) { 
            formUpdatePasword.querySelector("input[name=newPassword]").focus()
            formUpdatePasword.querySelector("input[name=newPassword]").classList.add("imput-highlight")
        }
        else if (error.type === 4) { 
            registerPage.querySelector("input[name=newPasswordConfirm]").focus()
            registerPage.querySelector("input[name=newPasswordConfirm]").classList.add("imput-highlight")
        }
    }


})

homePage.querySelector("button[name=logout]").addEventListener("click", function(event){

    homePage.classList.add("off")
    closeSession()
    
})

function openSession(email) {
    authenticatedEmail = email 

    homePage.classList.remove("off")
    homePage.querySelector(".name").innerText  = "Helo, " +nameEmail(email)
}

function closeSession() {
    authenticatedEmail = ""

    homePage.querySelector(".name").innerText  = ""

    loginPage.classList.remove("off")
}
