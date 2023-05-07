import Component from "../library/composito";

export default class UpdateAvatar extends Component{
    constructor(){
        super(`<div class="home-update-avatar-menu menu-page">
        <h3>UPDATE AVATAR</h3>
        <p>To update avatar, please provide a link that contains an image .png or .jpeg</p>
        <form class="form">
            <label for="url">Avatar's URL: </label>
            <input type="url" class="avatar-url-input form-item" name="url" placeholder="Enter url">
            <div class="form-buttons">
                <p class="fail-warning red"></p>
                <button class="form-avatar-cancel-button">Cancel</button>
                <button type="submit" class="form-avatar-submit-button">Update avatar</button>
            </div>
        </form>
    </div>`)
    }

}