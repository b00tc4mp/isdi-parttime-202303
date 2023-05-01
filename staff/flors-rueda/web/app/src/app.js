import Alert from "./components/alert.js";
import Navbar from "./components/navbar.js";
import ThemeToggle from "./components/theme-toggle.js";
import { Component } from "./library/mew.js";
import Home from "./pages/home.js";
import Login from "./pages/login.js";
import Register from "./pages/register.js";

export default class App extends Component {
  constructor() {
    super("<div></div>");

    const login = new Login();
    const register = new Register();
    const themeToggle = new ThemeToggle();
    const home = new Home();
    const navbar = new Navbar();

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
      this.add(navbar, home);
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
