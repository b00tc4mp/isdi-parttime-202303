import { Component } from '../library/composito.js'

export default class Profile extends Component {
    constructor() {
        super(`<section class="profile container">
        <h2>Update avatar</h2>

        <form class="profile-avatar-form">
            <input class="input" type="url" name="url">
            <button class="button" type="submit">Update</button>
        </form>

        <h2>Update password</h2>

        <form class="profile-password-form">
            <input class="input" type="password" name="password" placeholder="password">
            <input class="input" type="password" name="newPassword" placeholder="new password">
            <input class="input" type="password" name="newPasswordConfirm" placeholder="new password confirmation">
            <button class="button" type="submit">Update</button>
        </form>
    </section>`)

        // TODO mechanise forms
    }
}