import { Component } from "./library/composito.js";
import Login from "./pages/login.js";
import Register from "./pages/register.js";
import Home from "./pages/home.js";

export default class App extends Component {
  constructor() {
    super("<div></div>");

    const login = new Login();
    const register = new Register();
    const home = new Home();
    // const profile = new ProfilePanel();

    register.onLoginClick = () => {
      this.remove(register);
      this.add(login);
    };

    login.onRegisterClick = () => {
      this.remove(login);
      this.add(register);
    };

    login.onAuthenticated = () => {
      this.remove(login);
      this.add(home);
    };

    // home.onProfileClick = () => {
    //   if (!profile) {
    //     home.add(profile);
    //   } else {
    //     home.remove(profile);
    //   }
    // };

    // profile.onCancelClick = () => {
    //   home.remove(profile);
    // };

    this.add(login);
  }
}
