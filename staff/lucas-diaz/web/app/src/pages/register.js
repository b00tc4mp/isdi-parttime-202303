import registerUser from "../logic/register-user";
import Component from "../library/composito";

export default class Register extends Component {
    constructor() {
        super(`<section class="register">
        <h1 class="register-header">REGISTER</h1>
        <p class="fail-warning red"></p>
        <form class="form">
            <div class="input-box">
                <label>your username</label>
                <input type="text" class="form-username" name="name" placeholder="Enter username">
            </div>
            <div class="input-box">
                <label>your email</label>
                <input type="email" class="form-email" name="email" placeholder="Enter email"
                    autocomplete="current-password">
            </div>
            <div class="input-box">
                <label>your password</label>
                <input type="password" name="password" placeholder="Enter password" class="form-password"
                    autocomplete="current-password">
            </div>
            <button type="submit" class="submit-button sign-up">SIGN UP</button>
        </form>
    </section>`)

        //*VARIABLES DE REGISTER

        const registerForm = this.container.querySelector(".register form")
        //* VARIABLES WARNINGS

        const failRegisterAdvice = this.container.querySelector(".register .fail-warning");

        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const temporalUserName = event.target.name.value;
            const temporalEmail = event.target.email.value;
            const temporalPassword = event.target.password.value;
            try{
                registerUser(temporalUserName, temporalEmail, temporalPassword);
                this.onRegisterForm();
                registerForm.reset();
            } catch (error){
                failRegisterAdvice.textContent = error.message;
            }
        })
        

    }

    onRegisterForm() {
        console.log("go to login")
    }
}