import { Component } from "../library/composito.js";
import { registerUser } from "../logic/register-user.js";

export default class Register extends Component {
  constructor() {
    super(`<div class="register page container">
        <h1 class="title">Register</h1>

        <form class="form">
            <input class="input" type="text" name="name" placeholder="name">
            <input class="input" type="email" name="email" placeholder="email">
            <input class="input" type="password" name="password" placeholder="password">
            <button class="button" type="submit">Register</button>
        </form>

        <p>Go to <a href="">Login</a></p>
    </div>`)

    const registerForm = this.container.querySelector('form')
    registerForm.onsubmit = (event) => {
      event.preventDefault();

      const name = event.target.name.value;
      const email = event.target.email.value;
      const password = event.target.password.value;

      try {
        registerUser(name, email, password);

        this.onLoginRegisteredUser()

      } catch (error) {
          if (error.name === 'Error') {
              alert(error.message);
          } else {
              alert('Sorry, something went wrong.')
              console.log(error);
          }
      }
    }

    this.container.querySelector('a').onclick = (event) => {
      event.preventDefault()
    
      registerForm.reset()

      this.onLoginClick()
    }
  }

  onLoginClick() {
    console.log('Ha funcionado!');
  }
}