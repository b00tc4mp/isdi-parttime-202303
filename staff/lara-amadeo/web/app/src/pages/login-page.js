
import { feed, homePage, renderUser} from "./home-page.js"
import { context } from "../ui.js"
import { show, hide } from "../ui.js"
import { authenticateUser } from "../logic/authenticateUser.js"
import { showPosts } from "../logic/showPosts.js"
import { registrationPage } from "../pages/register-page.js"




export const loginPage = document.querySelector('.login')
const loginForm = loginPage.querySelector('form')



//Back to register
loginPage.querySelector('.create-account').querySelector('.link').addEventListener('click', function(event){
    event.preventDefault()

    hide(loginPage)
    show(registrationPage)
})

//Login
loginForm.onsubmit = function(event){
    event.preventDefault()

    const inputEmail = event.target.email.value
    const inputPassword = event.target.password.value


    try{

        context.userId = authenticateUser(inputEmail, inputPassword)

        hide(loginPage)
        show(homePage, feed)
        renderUser()
        showPosts()        
        
    } catch (error) {
        loginPage.querySelector('.error-message').textContent = error.message
    } finally {
        loginPage.querySelector('input[name=password]').value= ''
    }
}