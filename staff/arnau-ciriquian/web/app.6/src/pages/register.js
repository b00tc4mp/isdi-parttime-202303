import Component from "../library/composito.js";
import { addNewUser } from "../logic/register-user.js";

export default class Register extends Component {
    constructor() {
        super(`<div class="register">
            <header class="main-tittle">
                <img class="main-logo" src="./images/PunIntendedMain.png">
            </header>
            <div class="page">
                <h1 class="text">Register</h1>
                <form class="register__form">
                    <div class="inputs__box">
                        <input class="form__input" type="text" name="name" placeholder="username">
                        <input class="form__input" type="email" name="email" placeholder="email">
                        
                        <div class="password-container">
                            <input class="form__input register__password" type="password" name="password" placeholder="password">
                            <i class="register-eye fa-solid fa-eye"></i>
                        </div>
                        <div class="password-container">
                            <input class="form__input register__password--confirm" type="password" name="passwordConfirmation" placeholder="password confirmation">
                            <i class="register-confirm-eye fa-solid fa-eye"></i>
                        </div>
                    </div>
                    <button class="form__button" type="submit">Register</button>
                </form>

                <p class="text">Go to <a class="register__anchor--login" href="">Login</a></p>
            </div>
        </div>`)

        this.container.querySelector('form').onsubmit = event => {
            event.preventDefault()

            const newUser = event.target.name.value
            const newEmail = event.target.email.value
            const newPassword = event.target.password.value
            const confirmedPassword = event.target.passwordConfirmation.value

            try {
                addNewUser(newUser, newEmail, newPassword, confirmedPassword)

                // hideAllPasswords(registerPage, '.register__password', '.register__password--confirm')
                // unslashAllEyes(registerPage, '.register-eye', '.register-confirm-eye')

                document.querySelector('form').reset()
                this.onRegistered()
            } catch (error) {
                alert(error.message)
            }
        }

        this.container.querySelector('.register__anchor--login').onclick = event => {
            event.preventDefault()

            // hideAllPasswords(registerPage, '.register__password', '.register__password--confirm')
            // unslashAllEyes(registerPage, '.register-eye', '.register-confirm-eye')
            document.querySelector('form').reset()
            this.onLoginClick()
        }
    }

    onLoginClick() {
        throw new Error('not overriden')
    }

    onRegistered() {
        throw new Error('not overriden')
    }
}