import { Component } from "./library/composito.js";
import Login from "./pages/login.js";
import Register from "./pages/register.js";
import Home from "./pages/home.js";
// import EditPostPanel from "../components/edit-post-panel.js";
import { context } from "./ui.js";

export default class App extends Component {
  constructor() {
    super("<div class='app'></div>");

    const login = new Login();
    const register = new Register();
    let home = null;

    if (context.userId) {
      home = this.createHome(login);
      this.add(home);
    } else {
      this.add(login);
    }

    register.onLoginClick = register.onRegistered = () => {
      this.remove(register);
      this.add(login);
    };

    login.onRegisterClick = () => {
      this.remove(login);
      this.add(register);
    };

    login.onAuthenticated = () => {
      home = this.createHome(login);
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
  }

  createHome(login) {
    const home = new Home();

    home.onLogout = () => {
      this.remove(home);
      this.add(login);
    };

    // home.openEditPostPanel = () => {
    //   const editPostPanel = new EditPostPanel();
    // };

    return home;
  }
}
