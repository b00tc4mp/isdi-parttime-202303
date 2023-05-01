console.log('register.js')
import Component from "../library/component.js";


export default class Register extends Component {
    constructor() {
        super(`<section class="section register" id="register">
            <div class="container">
                <h1>Register</h1>
                <form class="register-form">
                    <div class="message"></div>
                    <label for="Name">Name</label>
                    <input type="text" name="name" id="register-name" placeholder="Your name" _required>
                    <label for="Email">Email</label>
                    <input type="email" name="email" id="register-email" placeholder="email" _required>
                    <label for="Password">Password</label>
                    <div class="password">
                        <input type="password" name="password" id="register-password" placeholder="password" _required>
                        <i class="uil uil-eye"></i>
                    </div>
                    <button class="submit" type="submit">Register</button>
                    <div class="login-link">
                        <p>Already registered? <a href="">Login</a></p>
                    </div>
                </form>
            </div>
        </section>`)

        this.container.querySelector('form').onsubmit = function(event) {
            event.preventDefault();
            const name = this.container.querySelector('input[name="name"').value
            const email = this.container.querySelector('input[name="email"').value
            const password = this.container.querySelector('input[name="password"').value
            try {
                const checkNewUserIsRegister = registerUser(name, email, password)        
                if(checkNewUserIsRegister) {
                    clearMessageContainer(registerPageMessage)
                    clearMessageContainer(loginPageMessage)
                    addClassOnContainer(loginPageMessage, 'success')
                    changeMessageOnContainer(loginPageMessage, 'User created! Please log in')
                    this.container.querySelector('form').reset()
                    toggleOffClassInSection(registerPage, loginPage)
                }
            } catch(error) {
                this.container.querySelector('.message').classList.add('error')
                this.container.querySelector('.message').textContent = error.message
            }
        }
        this.container.querySelector('a').onclick = event => {
            event.preventDefault()
            this.onLoginClick()
        }
    }
    onLoginClick() {
        throw new Error('Override me')
    }
}