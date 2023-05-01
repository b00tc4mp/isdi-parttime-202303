import { registerUser } from '../logic/register-user.js'
import { Component } from '../library/mew.js';

export default class Register extends Component {
  constructor() {
    super(`<section class="login-page">
              <section class="login-page__register">
                <h1 class="login-page__register__title">Register</h1>
                <form class="login-page__register__form" method="get">
                  <input class="login-page__register-input" name="mail" type="email" placeholder="your email" required/>
                  <input class="login-page__register-input" name="username" type="text" placeholder="yourusername" maxlength="15" required/>
                  <input class="login-page__register-input" name="password" type="password" placeholder="your password"
                  required/>
                  <input class="login-page__register-input" name="repeatPassword" type="password" placeholder="confirm your password" required/>
                  <button class="login-page__register-submit" type="submit">create user</button>
                </form>
              </section>
	          <div class="login-page__change-view">
                <p>Already have an account?</p>
                <p><a class="login-page__change-view--link">Sign in</a></p>
              </div>
            </section>`
    )

    this.container.querySelector('[name="username"]').input = event => {
      const username = event.target.username;
      controlUsernameInput(username);
    }

    this.container.querySelector('form').onsubmit = event => {
      event.preventDefault();
      const mail = event.target.mail.value;
      const username = event.target.username.value;
      const password = event.target.password.value;
      const repeatPassword = event.target.repeatPassword.value;
      try {
        registerUser(mail, username, password, repeatPassword);
        this.onRegistered()
      } catch (error) {
        alert(error.message)
      }
    }

    this.container.querySelector('.login-page__change-view--link').onclick = event => {
      event.preventDefault() 
      this.onLoginClick()
    }
  }

    onLoginClick() {
        throw new Error('not overridden')
    }

    onRegistered() {
        throw new Error('not overridden')
    }
}