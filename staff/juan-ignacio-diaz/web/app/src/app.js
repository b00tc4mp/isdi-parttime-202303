import { Component } from './library/composito.js'
import { context } from './ui.js'

import Login from './pages/login.js'
import Register from './pages/register.js'
import Home from './pages/home.js'

export default class App extends Component {
    constructor() {
        super(`<div></div>`)

        const login = new Login
        const register = new Register
        const home = new Home

        login.OnRegisterClick = () => {
            this.remove(login)
            this.add(register)
        }

        login.onAuthenticated = (userId) => {
            context.userId = userId
            home.loadPosts()

            this.remove(login)
            this.add(home)
        }

        register.onRegisterSave = () => {
            this.remove(register)
            this.add(login)
        }

        register.onLoginClik = () => {
            this.remove(register)
            this.add(login)
        }

        home.onCloseSession = () => {
            delete context.userId
            
            this.remove(home)
            this.add(login)
        }

        if (context.userId && context.userId !== '') {
            this.add(home)
        }
        else 
            this.add(login)
    }

}