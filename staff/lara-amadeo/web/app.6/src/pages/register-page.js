import { show, hide } from "../ui.js"
import { registerUser } from "../logic/registerUser.js"
import { loginPage } from "./login-page.js"

export const registrationPage = document.querySelector('.registration')
const registerForm = registrationPage.querySelector('form')



//Registration
registerForm.onsubmit = function(event){
    event.preventDefault()
    
   const registrationName = registrationPage.querySelector('input[name=username]').value
   const registrationEmail = registrationPage.querySelector('input[name=email]').value
   const registrationPassword = registrationPage.querySelector('input[name=password]').value
   const registrationRepPassword = registrationPage.querySelector('input[name=rep-password]').value

   try {
    registerUser(registrationName, registrationEmail, registrationPassword,registrationRepPassword)
    hide(registrationPage)
    show(loginPage)
   } catch (error) {
    generateToast({
        message: error.message,
        type: errorToast, 
        length: '3000ms'
    })
   }
   finally {
    registrationPage.querySelector('input[name=password]').value = ''
    registrationPage.querySelector('input[name=rep-password]').value = ''
   }
}

//Already an account
registrationPage.querySelector('a').addEventListener('click', function(event){
    event.preventDefault()
    hide(registrationPage)
    show(loginPage)
})