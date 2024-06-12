import { updateEmail } from '../../logic/updateEmail'
import { generateToast, successToast, errorToast } from '../../ui'

export default function UpdateEmail(props){

    function onCancel(event){
        event.preventDefault()

        props.onCancelUpdateEmailClick()
    }

    function handleUpdateEmail(event){
        event.preventDefault()

        const currentEmail = event.target.currentEmail.value
        const newEmail = event.target.newEmail.value
        const confirmNewEmail = event.target.confirmNewEmail.value

        try{
            updateEmail(currentEmail, newEmail, confirmNewEmail)
            generateToast({
                message: 'Email updated!',
                type: successToast
            })

            props.onSaveUpdateEmailClick()
        } catch(error){
            generateToast({
                message: error.message,
                type: errorToast
            })
        }
    }

    return <div className="update-mail">

    <div className="centered-containers">
        <h1 className="title">Profile settings</h1>
        <h2 className="subtitle">Email update</h2>
    
        <form className="centered-form" onSubmit={handleUpdateEmail}>

            <label htmlFor="currentEmail" className="text-field-label">Current email</label>
            <input type="text" name="currentEmail" className="text-field"/>

            <label htmlFor="newEmail" className="text-field-label">New email</label>
            <input type="text" name="newEmail" className="text-field"/>

            <label htmlFor="confirmNewEmail" className="text-field-label">Confirm new email</label>
            <input type="text" name="confirmNewEmail" className="text-field"/>

            
            <div className="button-bar">
            <button className="button-S secondary-button" id="cancel-update-email" type="button" onClick={onCancel}>Cancel</button>
            <button className="button-S primary-button" id="save-update-email" type="submit">Save</button>
            </div>
        </form>
    </div>
</div>
}