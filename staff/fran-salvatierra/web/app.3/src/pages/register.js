import registerUser from '../logic/register-user.js';
import { Component } from "../library/composito.js";

export default class Register extends Component {
    constructor() {
        super(`<div class="register page container">
        <h1 class="title">Register</h1>

        <form class="form">
            <input class="input" type="text" name="name" placeholder="name">
            <input class="input" type="email" name="email" placeholder="email">
            <input class="input" type="password" name="password" placeholder="password">
            <button class="button" type="submit">Register</button>
        </form>

        <p>Go to <a href="">Login</a></p>
    </div>`);
        
        this.container.querySelector('form').onsubmit = event => {
            event.preventDefault();
            const name = document.querySelector('input[name="name"]').value;
            const email = document.querySelector('input[name="email"]').value;
            const password = document.querySelector('input[name="password"]').value;
            

            try {
                registerUser(name, email, password)
                this.onRegistered()
    
            } catch (error) {
                alert(error.message)
            }
        }

        this.container.querySelector('a').onclick = event => {
            event.preventDefault()
        
            try {
                this.onLoginClick()

            } catch (error) {
                alert(error.message)
            }
        }
    }

    

    onRegistered(){
        console.log('Go to login')
    }

    onLoginClick(){
        console.log('Go to login')
    }

}
