import { Component } from "./library/master-component";
import { Login } from "./pages/login.js"
import { Register } from "./pages/register.js";
import { Home } from "./pages/home.js"
import { context } from "./ui";

export class App extends Component {
    constructor(){
        super('<div class="body"></div>')

        
        const showLogin = (home) => {
            const login = new Login

            login.goToRegisterLink = () => {
                const register = new Register

                this.remove(login)
                this.add(register) 
                
                register.onRegistered = () => {
                    this.remove(register)
                    this.add(login)
                }

                register.goToLoginLink = () => {
                    this.remove(register)
                    this.add(login)
                }
            }

            login.onAuthenticated = () => {
                this.remove(login)
                this.add(home)
            }

            this.add(login)
        }

        if (context.userId){
            const home = new Home

            home.onLogOutLink = () => {
                this.remove(home)
                showLogin(home)
            }

            this.add(home)
        } else showLogin()  
    }
}

// super('<div class="body"></div>')

// const login = new Login
// const register = new Register
// this.add(login)

// register.onRegistered = () => {
//     this.remove(register)
//     this.add(login)
// }

// login.goToRegisterLink = () => {
//     this.remove(login)
//     this.add(register)
// }

// register.goToLoginLink = () => {
//     this.remove(register)
//     this.add(login)
// }

// login.onAuthenticated = () => {
//     const home = new Home
//     this.remove(login)
//     this.add(home)

//     home.onLogOutLink = () => {
//         this.remove(home)
//         this.add(login)
//     }
// }