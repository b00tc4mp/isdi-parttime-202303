console.log('login.js')

import Component from '../library/component.js'
import { authenticateUser } from '../logic/users/authenticate-users.js'
import { context, bodyPage, clearMessageContainer } from '../ui.js'
import { pushUserDataToHeader } from '../components/helpers/push-user-to-header.js'

export default class Login extends Component {
    constructor() {
        super(`<section class="section login" id="login">
        <div class="container">
            <h1>Login</h1>
            <form class="login-form">
                <div class="message"></div>
                <label for="Email">Email</label>
                <input type="email" name="email" placeholder="Your email" _required>
                <label for="Password">Password</label>
                <div class="password">
                    <input type="password" name="password" placeholder="Your password" _required>
                    <i class="uil uil-eye"></i>
                </div>
                <button class="submit" type="submit">Login</button>
                <div class="register-link">
                    <p>Not registered? <a href="">Create account</a></p>
                </div>
            </form>
        </div>
        </section>`)

        this.container.querySelector('form').onsubmit = function(event) {
            event.preventDefault()
            const email = event.target.email.value.trim()
            const password = event.target.password.value
            try {
                context.userId = authenticateUser(email, password)
                const userId = context.userId
  
                // clearMessageContainer(loginPageMessage)
                // toggleOffClassInSection(loginPage, homePage)
                // const userName = getUserName(userId)
                // const userImage = getUserImage(userId)
                // context.userId = userId
                // context.image = userImage
                // const welcomeUser = document.querySelector('.welcome-user').innerHTML = `Welcome ${userName}!`
                // context.userId = userId
                // renderUser()
                pushUserDataToHeader(userId)

            } catch(error) {
                this.querySelector('.message').classList.add('error')
                this.querySelector('.message').textContent = error.message     
                console.log(error.message)   
                console.log(error.stack)   
            }
        }
        this.container.querySelector('a').onclick = event => {
            event.preventDefault()
            this.onRegisterClick()
        }
        this.container.onsubmit = event => {
            event.preventDefault()
            this.onAuthenticated()
        }
    }
    onRegisterClick() {
        throw new Error('Override me')
    }
    onAuthenticated() {
        throw new Error('Override me')
    }
}