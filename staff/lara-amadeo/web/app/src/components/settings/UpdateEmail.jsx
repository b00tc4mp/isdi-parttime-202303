import  updateEmail  from '../../logic/updateEmail'
import { useContext } from "react"
import Context from '../../Context'
export default function UpdateEmail({ onCancelUpdateEmailClick, onSaveUpdateEmailClick }){

    const { generateToast, freeze, unfreeze } = useContext(Context)

    function onCancel(event){
        event.preventDefault()

        onCancelUpdateEmailClick()
    }

    function handleUpdateEmail(event){
        event.preventDefault()

        const currentEmail = event.target.currentEmail.value
        const newEmail = event.target.newEmail.value
        const confirmNewEmail = event.target.confirmNewEmail.value

        try{
            freeze('overlay')
            updateEmail(currentEmail, newEmail, confirmNewEmail, (error) => {
                if(error){
                    unfreeze()
                    generateToast(error.message,'error')
                    return
                }
                unfreeze()
                onSaveUpdateEmailClick()
                generateToast('Email updated!', 'success')
            })
        } catch(error){
            unfreeze()
            generateToast(error.message,'error')
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
            <button className="button-S secondary-button" type="button" onClick={onCancel}>Cancel</button>
            <button className="button-S primary-button" type="submit">Save</button>
            </div>
        </form>
    </div>
</div>
}