import Component from "./library/composito";
import Login from "./pages/login.js"
import Register from "./pages/register";

export default class App extends Component{
    constructor(){
        super(`<div class="container"></div>`)

        const login = new Login
        const register = new Register


        login.onRegisterClick = () => {
            this.remove(login);
            this.add(register);
        }

        register.onRegisterForm = () => {
            this.remove(register);
            this.add(login);
        }

        this.add(login)
    }
}