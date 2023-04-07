import { addNewUser, authenticateUser, getLoggedUser, updateUserPassword, updateUserEmail, updateUsername } from "./logic.js"

// export const registerPage = document.querySelector('.register')
// export const loginPage = document.querySelector('.login')
// export const homePage = document.querySelector('.home')
// export const homePageProfile = homePage.querySelector('.home__profile')
// export const homePagePassword = homePage.querySelector('.home__password')
// export const homePageUsername = homePage.querySelector('.home__username')
// export const homePageEmail = homePage.querySelector('.home__email')
// export const homePageMain = homePage.querySelector('.home__main')
// export const context = {
//     userID: null
// }
//export var loggedUserName = ''


// registerPage.querySelector('form').onsubmit = function(event) {
//     event.preventDefault()
//     const newUser = event.target.name.value
//     const newEmail = event.target.email.value
//     const newPassword = event.target.password.value
//     const confirmedPassword = event.target.passwordConfirmation.value

//     try {
//         addNewUser(newUser, newEmail, newPassword, confirmedPassword)

//         registerPage.classList.add('off')
//         loginPage.classList.remove('off')
//         registerPage.querySelector('form').reset()
//     } catch (error) {
//         alert(error.message)
//     }
// }

// loginPage.querySelector('form').onsubmit = function(event) {
//     event.preventDefault()
//     //debugger
//     const email = event.target.email.value
//     const password = event.target.password.value

//     try {
//         authenticateUser(email, password)
//         context.userID = email
//         const foundUser = getLoggedUser(email)

//         loginPage.classList.add('off')
//         homePage.classList.remove('off')
//         homePageMain.classList.remove('off')
//         homePage.querySelector('.home__anchor--profile').innerText = foundUser.name
//         loginPage.querySelector('form').reset()
//     } catch (error) {
//         alert(error.message)
//     }
// }

// homePage.querySelector('.password__form').onsubmit = function(event) {
//     event.preventDefault()

//     var oldPassword = event.target.oldPassword.value
//     var newPassword = event.target.newPassword.value
//     var confirmedPassword = event.target.newPasswordConfirmation.value
//     var email = context.userID

//     try {
//         updateUserPassword(email, oldPassword, newPassword, confirmedPassword)

//         homePageProfile.classList.remove('off')
//         homePagePassword.classList.add('off')
//         homePage.querySelector('.password__form').reset()
//     } catch (error) {
//         alert(error.message)
//     } 
// }

// homePage.querySelector('.email__form').onsubmit = function(event) {
//     event.preventDefault()

//     var oldEmail = event.target.oldEmail.value
//     var newEmail = event.target.newEmail.value
//     var confirmedEmail = event.target.newEmailConfirmation.value
//     var password = event.target.emailPassword.value

//     try {
//         updateUserEmail(oldEmail, newEmail, confirmedEmail, password)

//         homePageProfile.classList.remove('off')
//         homePageEmail.classList.add('off')
//         homePage.querySelector('.email__form').reset()
//     } catch (error) {
//         alert(error.message)
//     }
// }

// homePage.querySelector('.username__form').onsubmit = function(event) {
//     event.preventDefault()

//     var oldUsername = event.target.oldUsername.value
//     var newUsername = event.target.newUsername.value
//     var password = event.target.password.value
//     var email = context.userID

//     try {
//         updateUsername(email, oldUsername, newUsername, password)

//         homePageProfile.classList.remove('off')
//         homePageUsername.classList.add('off')
//         homePage.querySelector('.username__form').reset()
//     } catch (error) {
//         alert(error.message)
//     }
// }

// export function closeProfilePages() {
// // si afegeixo canvi d'avatar afegir el close profile pertinent
//     homePageUsername.classList.add('off')
//     homePageEmail.classList.add('off')
//     homePagePassword.classList.add('off')
// }


/*  TODO Web/App - objectiu de la app: xarxa social:
    - ig de stickers?
    - estil twitter?
    - likes, post, comments?:   
    - rollo ig?
            - reorganirtzar fitxer a logica (un fitxer per a cada logica), helpers (en funcio del seu us), pagines (anchors + main de cada una) etc 20230406 2030
            
            - afegir id als users 20230405 2115 i modificar tots els scripts de validar a traves del id en comptes del mail
            - Foto perfil 20230328 2100
            - canviar alerts per missatges en pantalla?o un toast?
            - al fer logout posar un avatar random per evitar deixar lavatar de lusuari previ
            - tancar ulls de les contrasenyes amb el canvi de pagina. Un if? si type text fer un toggle de fa-eye-slash i canvi de tipus
            - modularitzar: aplicar imports i exports a la web/app
            - passar vars a const i let
            - passar for basics a for of?
            - mirar cause pels errors??
            - poder crear un post (dun en un), text o imatge amb la data del post:
                comncem amb boto + al  footer
                seguim amb ventana modal?
            - implementar a home vista dels posts per ordre de mes nous a mes vells
            -

    TODO Arrays:
            - metodes amb callback:
                -
            - seguir amb splice, rersoldre afegir X i  als months
            
    DONE    - 
            - afegir favicon
            -
            -
            -

    PREGUNTES:
            - 
*/              