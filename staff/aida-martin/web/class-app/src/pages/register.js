import { Component } from "../library/composito.js";
import registerUser from "../logic/register-user.js";

export default class Register extends Component {
  constructor() {
    super(`<section class="register">
    <h1 class="title">CREATE ACCOUNT</h1>

    <form class="form">
      <input class="input" type="text" name="name" placeholder="Name" />

      <input class="input" type="text" name="email" placeholder="Email" />

      <input
        class="input"
        type="password"
        name="password"
        placeholder="Password"
      />

      <input
        class="input"
        type="password"
        name="repeatpassword"
        placeholder="Repeat password"
      />

      <p class="register-error error off"></p>

      <button class="button register-button">SIGN UP</button>
    </form>

    <p class="login-answer">
      Have already an account? <a href="#" class="login-link">Login here</a>
    </p>
  </section>`);

    const registerForm = this.container.querySelector("form");

    this.container.onsubmit = (event) => {
      event.preventDefault();

      const name = event.target.name.value;
      const email = event.target.email.value;
      const password = event.target.password.value;
      const repeatPassword = event.target.repeatpassword.value;

      try {
        registerUser(name, email, password, repeatPassword);

        registerForm.reset();

        this.onRegistered();
      } catch (error) {
        console.log(error.message);
        // errorShow(registerError, error);
      }
    };

    this.container.querySelector(".login-link").onclick = () => {
      registerForm.reset();

      this.onLoginClick();
    };
  }

  //Este método se declara aquí por si se nos olvida declararlo, nos avisa, pero no hace falta
  onLoginClick() {
    throw new Error("Not overridden");
  }

  onRegistered() {
    throw new Error("Not overridden");
  }
}
