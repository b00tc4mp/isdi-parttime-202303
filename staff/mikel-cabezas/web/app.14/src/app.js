import Component from "./library/component.js";
import LoginPage from './pages/login.js'

class App extends Component {
    constructor() {
        super('<div class="main-content"></div>')
 
        const login = new LoginPage
        this.add(login)

    }
}