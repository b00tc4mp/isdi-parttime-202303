import { Component } from "../library/composito.js";
import authenticateUser from "../logic/authenticate-user.js";
import { context } from "../ui.js";

export default class Login extends Component {
  constructor() {
    super(`<section class="login">
        <h1 class="title">WELCOME!</h1>
  
        <form class="form">
          <input class="input" type="email" name="email" placeholder="Email" />
  
          <input
            class="input"
            type="password"
            name="password"
            placeholder="Password"
          />
  
          <a href="#" class="forgot-password-link">Forgot password?</a>
  
          <p class="login-error error off"></p>
  
          <button class="button login-button">LOG IN</button>
        </form>
  
        <p class="register-answer">
          Not a member?
          <a href="#" class="register-link">Sign up here</a>
        </p>
      </section>`);

    const loginForm = this.container.querySelector("form");

    this.container.querySelector("form").onsubmit = (event) => {
      event.preventDefault();

      const email = event.target.email.value;
      const password = event.target.password.value;

      try {
        context.userId = authenticateUser(email, password);

        loginForm.reset();

        //hide(loginError);

        this.onAuthenticated();

        alert("autenticado");
      } catch (error) {
        alert("no autenticado");
        //errorShow(loginError, error);
      }
    };

    this.container.querySelector(".register-link").onclick = () => {
      loginForm.reset();

      // hide(registerError, loginError);

      this.onRegisterClick();
    };
  }

  //Estos dos métodos se declaran aquí por si se nos olvida declararlos, nos avisan, pero no hace falta
  onRegisterCLick() {
    throw new Error("Not overridden");
  }

  onAuthenticated() {
    throw new Error("Not overridden");
  }
}
