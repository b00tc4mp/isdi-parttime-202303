import { Component } from '../library/composito.js';
import registerUser from '../logic/register-user.js';

export default class Register extends Component {
  constructor() {
    super(`<div class="register page container">
        <div class="credentials-container">
        <h1 class="title">Register</h1>

        <form class="form">
            <input class="input" type="text" name="name" placeholder="name">
            <input class="input" type="email" name="email" placeholder="email">
            <input class="input" type="password" name="password" placeholder="password">
            <button class="button" type="submit">Register</button>
        </form>

        <p><a href="">Login</a></p>
      </div>
    </div>`);

    this.container.querySelector('form').onsubmit = (event) => {
      event.preventDefault();

      const registerName = event.target.name.value,
        registerEmail = event.target.email.value,
        registerPassword = event.target.password.value;

      try {
        registerUser(registerName, registerEmail, registerPassword);

        this.onRegistered();
      } catch (error) {
        alert(error.message);
      }
    };

    this.container.querySelector('a').onclick = (event) => {
      event.preventDefault();

      this.onLoginClick();
    };
  }
}
