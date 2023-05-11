import updateUserPassword from "../logic/updateUserPassword.js"
import { context } from "../ui.js";

export default function UpdatePassword(props) {
    function handleUpdatePassword(event) {
        event.preventDefault();
        try {
            const oldPassword = document.querySelector(".old-password");
            const newPassword = document.querySelector(".new-password");
            const newPasswordRepetition = document.querySelector(".new-password-repetition");
            updateUserPassword(context.userId, oldPassword, newPassword, newPasswordRepetition);
            props.onUpdatedPassword();

        } catch (error) {
            document.querySelector(".fail-password-match-advise").textContent = error.message;
        }

    }

    function handleCancelClick(event) {
        event.preventDefault();
        props.onCancelClick();
    }


    return <div className="change-password-menu menu-page">
        <h3>UPDATE PASSWORD</h3>
        <p>To change current password, provide a new one</p>
        <form className="form" onSubmit={handleUpdatePassword}>
            <label htmlFor="old-password">Old password: </label>
            <input type="text" className="old-password form-item" name="old-password" placeholder="Enter old password"
                autoComplete="current-password" />
            <label htmlFor="new-password">New password:</label>
            <input type="password" className="new-password form-item" name="new-password" placeholder="Enter new password"
                id="new-password" autoComplete="current-password" />
            <label htmlFor="new-password-repetition">Repeat new password:</label>
            <input type="password" className="new-password-repetition form-item" name="new-password-repetition"
                placeholder="Enter again new password" id="new-password-repetition" autoComplete="current-password" />
            <p className="fail-password-match-advise red"></p>
            <div className="form-buttons">
                <button className="cancel-change-password" onClick={handleCancelClick}>Cancel</button>
                <button type="submit" className="change-password">Change password</button>
            </div>
        </form>
    </div>

}