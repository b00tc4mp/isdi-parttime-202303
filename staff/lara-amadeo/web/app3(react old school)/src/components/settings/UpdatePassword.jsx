import { context, successToast, errorToast } from "../../ui"
import { updatePassword } from '../../logic/updatePassword'

export default function UpdatePassword(props){

    function handleUpdatePassword(event){
        event.preventDefault()

        const currentPassword = event.target.currentPassword.value
        const newPassword = event.target.newPassword.value
        const confirmNewPassword = event.target.confirmNewPassword.value

        try{
            updatePassword(context.userId, currentPassword, newPassword, confirmNewPassword)
            generateToast({
                message: 'Password updated!',
                type: successToast
            })

            props.onSaveUpdatePasswordClick()
        } catch(error){
            generateToast({
                message: error.message,
                type: errorToast
            })
        }
    }

    function onCancel(event){
        event.preventDefault()

        props.onCancelUpdatePasswordClick()
    }

    return  <div className="update-password">
        
    <div className="centered-containers">
        <h1 className="title">Profile settings</h1>
        <h2 className="subtitle">Password update</h2>
    
        <form className="centered-form" onSubmit={handleUpdatePassword}>

            <label htmlFor="currentPassword" className="text-field-label">Current password</label>
            <input type="password" name="currentPassword" className="text-field"/>

            <label htmlFor="newPassword" className="text-field-label">New password</label>
            <input type="password" name="newPassword" className="text-field"/>

            <label htmlFor="confirmNewPassword" className="text-field-label">Confirm new password</label>
            <input type="password" name="confirmNewPassword" className="text-field"/>

            <div className="button-bar">
            <button className="button-S secondary-button" id="cancel-update-password" type="button" onClick={onCancel}>Cancel</button>
            <button className="button-S primary-button" id="save-update-password" type="submit">Save</button>
            </div>
        </form>
    </div>

</div>
}