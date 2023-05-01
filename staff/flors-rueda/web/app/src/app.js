import Alert from "./components/alert.js";
import ThemeToggle from "./components/theme-toggle.js";
import { Component } from "./library/mew.js";
import Login from "./pages/login.js";
import Register from "./pages/register.js";

export default class App extends Component {
  constructor() {
    super("<div></div>");

    const login = new Login();
    const register = new Register();
    const themeToggle = new ThemeToggle()

    login.onRegisterClick = () => {
      this.remove(login);
      this.add(register);
    };

    register.onLoginClick = () => {
      this.remove(register);
      this.add(login);
    };

    login.onAuthenticated = () => {
      this.remove(login);
      console.log("haiii!");
    };

    register.onRegistered = () => {
      const message = `Hello, ${(register.container.querySelector('[name="username"]').value)}! Your account is registered. You can sign in now!`;
      this.remove(register);
      this.add(login);
      const alert = new Alert('success', message, 'Done!');
      this.add(alert);
      alert.onCloseClick = () => {
        this.remove(alert);
      }
    };

    this.add(login, themeToggle);
  }
}
