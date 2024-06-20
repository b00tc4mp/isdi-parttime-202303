import registerUser from '../logic/register-user.js'
import { Component } from '../library/composito.js'

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
    </div>`)
    }
}
