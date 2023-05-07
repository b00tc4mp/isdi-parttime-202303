import Component from "../library/composito";

export default class UpdatePassword extends Component{
    constructor(){
        super(`<div class="change-password-menu menu-page">
        <h3>UPDATE PASSWORD</h3>
        <p>To change current password, provide a new one</p>
        <form class="form">
            <label for="old-password">Old password: </label>
            <input type="text" class="old-password form-item" name="old-password" placeholder="Enter old password"
                autocomplete="current-password">
            <label for="new-password">New password:</label>
            <input type="password" class="new-password form-item" name="new-password" placeholder="Enter new password"
                id="new-password" autocomplete="current-password">
            <label for="new-password-repetition">Repeat new password:</label>
            <input type="password" class="new-password-repetition form-item" name="new-password-repetition"
                placeholder="Enter again new password" id="new-password-repetition" autocomplete="current-password">
            <p class="fail-password-match-advise red"></p>
            <div class="form-buttons">
                <button class="cancel-change-password">Cancel</button>
                <button type="submit" class="change-password">Change password</button>
            </div>
        </form>
    </div>`)
    }

}