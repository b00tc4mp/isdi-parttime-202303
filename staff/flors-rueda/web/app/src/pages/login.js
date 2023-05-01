/*
import initLoginForm from '../components/login-form.js';
import initRegisterForm from '../components/register-form.js';
import { context } from '../ui/general-tools.js';
import { changeView } from '../ui/login.js';

export const loginPage = document.querySelector('.login-page');
export const register = document.querySelector('.login-page__register');
export const login = document.querySelector('.login-page__login');

const changeViewLink = document.querySelector('.login-page__change-view--link');

changeViewLink.addEventListener('click', (event) => {
  event.preventDefault();
  changeView(changeViewLink, login, register)
});

initRegisterForm(changeViewLink, register, login);
initLoginForm(context, loginPage);
*/

import { Component } from '../library/mew.js';
import { authenticateUser } from '../logic/authenticate-user.js';
import { context, controlUsernameInput } from '../ui/general-tools.js';

export default class Login extends Component {
  constructor() {
    super(`<section class="login-page">
            <section class="login-page__login">
              <h1 class="login-page__login__title">Login</h1>
              <form class="login-page__login__form" method="get">
                <input class="login-page__login-input" name="username" type="text" placeholder="yourusername"
                  maxlength="15" required />
                <input class="login-page__login-input" name="password" type="password" placeholder="your password"
                  required />
                <button class="login-page__login-submit" type="submit">sign in</button>
              </form>
            </section>
            <div class="login-page__change-view">
              <p>You're new here?</p>
              <p><a class="login-page__change-view--link">Sign up</a></p>
            </div>
          </section>`)

    this.container.querySelector('[name="username"]').input = event => {
      const username = event.target.username;
      controlUsernameInput(username);
    }

    this.container.querySelector('form').onsubmit = event => {
      event.preventDefault();
      const username = event.target.username.value;
      const password = event.target.password.value;
      try {
        context.userAuth = authenticateUser(username, password);
        this.onAuthenticated()
      } catch (error) {
        alert(error.message)
      }
    }

    this.container.querySelector('.login-page__change-view--link').onclick = event => {
      event.preventDefault() 
      this.onRegisterClick()
    }
  }

    onRegisterClick() {
        throw new Error('not overridden')
    }

    onAuthenticated() {
        throw new Error('not overridden')
    }
}