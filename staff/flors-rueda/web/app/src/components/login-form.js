import { displayLoginError } from '../ui/errors.js';
import { controlUsernameInput, setOff, setOn } from '../ui/general-tools.js';
import { authenticateUser } from '../logic/authenticate-user.js';
import { displayWelcome } from '../ui/home.js';

export default function initLoginForm(context, loginPage, homePage, homeMain) {
    const loginForm = document.querySelector('.login-page__login__form');
    const usernameLogin = loginForm.querySelector('input[name="username"]');

    usernameLogin.addEventListener('input', (event) => {
        controlUsernameInput(usernameLogin);
    });

    const doLogin = () => {
        const username = loginForm.querySelector('input[name="username"]').value;
        const password = loginForm.querySelector('input[name="password"]').value
        const token = authenticateUser(username, password);
        setOff(loginPage)
        setOn(homePage, homeMain);
        return token
      };

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        try {
          context.userAuth = doLogin();
          displayWelcome(context.userAuth);
          console.log('login',context.userAuth)
          //initPostsList(context.userAuth, postModal, 'all')
        } catch (error) {
          displayLoginError(error.message, loginForm);
        }
      });
}