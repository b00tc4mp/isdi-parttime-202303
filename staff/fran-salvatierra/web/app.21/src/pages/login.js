import { Component } from "../library/composito.js";
import { authenticateUser } from "../logic/authenticate-user.js";
import { context } from "../ui.js"

export default class Login extends Component {
    constructor() {
        super(`
            <div class="login page container ">
                <h1 class="title">Login</h1>

                <form class="form">
                    <input class="input" type="email" name="email" placeholder="email">
                    <input class="input" type="password" name="password" placeholder="password">
                    <button class="button" type="submit">Login</button>
                </form>

                <p>Go to <a href="">Register</a></p>
            </div>`
        )

        this.container.querySelector('form').onsubmit = function (event) {
            event.preventDefault()
        
            const email = event.target.email.value
            const password = event.target.password.value
        
            try {
                context.userId = authenticateUser(email, password)
        
                alert('TODO go home')
            } catch (error) {
                alert(error.message)
            }
        }
    }
}