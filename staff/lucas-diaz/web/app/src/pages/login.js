import Component from "../library/composito";
import authenticateUser from "../logic/authenticate-user";
import { context } from "../ui";


export default class Login extends Component {
    constructor() {
        super(`<section class="login">
        <h1 class="login-header">LOG IN</h1>
        <p class="login-success-warning green off">User created successfully</p>
        <p class="fail-warning red"></p>
        <form class="form">
            <div class="input-box">
                <label>your email</label>
                <input type="email" class="form-email" name="email" placeholder="Enter email" autocomplete="current-password">
            </div>
            <div class="input-box">
                <label>your password</label>
                <input type="password" class="form-password" name="password" placeholder="Enter password" autocomplete="current-password">
            </div>
            <div class="login-other-options">
                <div class="login-other-options-remember-me">
                    <input type="checkbox" name="remember" id="log-in-checkbox">
                    <label for="log-in-checkbox">Remember me</label>
                </div>
                <a class="forgot-password-anchor green" href="">Forgot password?</a>
            </div>
            <button type="submit" class="submit-button log-in">LOG IN</button>
            <p class="initialize-register">
                not a member? <a href="" class="login-register-anchor green">register here</a>
            </p>
        </form>
    </section>`)

        const failLogInAdvice = this.container.querySelector(".login .fail-warning")
        const logInForm = this.container.querySelector(".login form");
        const loginRegistrationAnchor = this.container.querySelector(".login-register-anchor");

        this.container.querySelector("form").onsubmit = function (event) {
            event.preventDefault();

            const email = event.target.email.value
            const password = event.target.password.value

            try {
                context.userId = authenticateUser(email, password);
                failLogInAdvice.textContent = "";
                logInForm.reset();

                alert("TODO go to home")

            } catch (error) {
                failLogInAdvice.textContent = error.message;
            }
        }


        loginRegistrationAnchor.onclick = event => {
            event.preventDefault();
            failLogInAdvice.textContent = "";

            this.onRegisterClick();
        }

        this.container.querySelector(".forgot-password-anchor").addEventListener("click", (event) => {
            event.preventDefault();
        })

        
    }

    onRegisterClick() {
        console.log("Go to register")
    }
}