import updateUserAvatar from "../logic/updateUserAvatar";
import { context } from "../ui";


export default function UpdateAvatar (props) {
    
    function handleUpdateAvatar(event){
        event.preventDefault();
        
        let url = event.target.url.value
        updateUserAvatar(context.userId,url);
        props.onUpdatedAvatar();

    }

    function handleCancelClick(event){
        event.preventDefault();
        props.onCancelClick();
    }

    return <div className="home-update-avatar-menu menu-page">
    <h3>UPDATE AVATAR</h3>
    <p>To update avatar, please provide a link that contains an image .png or .jpeg</p>
    <form className="form" onSubmit={handleUpdateAvatar}>
        <label htmlFor="url">Avatar's URL: </label>
        <input type="url" className="avatar-url-input form-item" name="url" placeholder="Enter url"/>
        <div className="form-buttons">
            <p className="fail-warning red"></p>
            <button className="form-avatar-cancel-button" onClick={handleCancelClick}>Cancel</button>
            <button type="submit" className="form-avatar-submit-button">Update avatar</button>
        </div>
    </form>
</div>
}