import { context } from "../ui"
import { updateUserPassword } from "../logic/users/updateUserPassword"
import { useState } from "react"

export default function UpdateUserPassword() {
    const userId = context.userId

    const [disabled, setDisabled] = useState(true)


    function handleUpdatePassword (event) {
        event.preventDefault()
        try {
            const currentPassword = event.target.parentElement.parentElement.elements['password']
            const newPassword = event.target.parentElement.parentElement.elements['new-password']
            const repeatPassword = event.target.parentElement.parentElement.elements['repeat-password']
            const buttons = event.target.parentElement.parentElement.elements['.buttons']
            currentPassword && newPassword  && repeatPassword && updateUserPassword(userId, currentPassword, newPassword, repeatPassword)
            setDisabled(true)
            setTimeout(() => {
                currentPassword.disabled = true
                newPassword.disabled = true
                repeatPassword.disabled = true
                updateUserPassword && event.target.parentElement.parentElement.reset()
            }, 100); 
        } catch(error) {
            console.log(error.stack)
        }
    }
 
    function handleUpdatePasswordClick(event) {
        event.preventDefault()
        try {
            setDisabled(false)
        } catch(error) {
            console.log(error.message)
        }
    }
    function handleCancelUpdatePassword(event) {
        event.preventDefault()
        try {
            setDisabled(true)
        } catch(error) {
            console.log(error.message)
        }
    }

    return <> 
        <div className="container update update-password" id="update-password">
            <h2>Update password</h2>
            <p>Press de pencil icon for edit your password.<br/>
            You cannot set the same password</p>
            <button className="button--update-info__password" onClick={handleUpdatePasswordClick}>Update password <i className="uil uil-pen"></i></button>
            <form className="data user-password">
                <label htmlFor="">Current password</label>
                <div className="password current-password">
                    <input className="current-password" type="password" defaultValue="" name="password" disabled={disabled} />
                    <i className="uil uil-eye"></i>
                </div>
                <label htmlFor="">New password</label>
                <div className="password new-password">
                    <input className="new-password" type="password" defaultValue="" name="new-password" disabled={disabled} />
                    <i className="uil uil-eye"></i>
                </div>
                <label htmlFor="">Repeat password</label>
                <div className="password repeat-password">
                    <input className="repeat-password" type="password" defaultValue="" name="repeat-password" autoComplete="off" disabled={disabled} />
                    <i className="uil uil-eye"></i>
                </div>
                <div className={`buttons ${!disabled ? '' : 'off'}`}>
                    <button className="button--update-info__cancel-password" type="cancel" onClick={handleCancelUpdatePassword}>Cancel</button>
                    <button className="button--update-info__save-password" onClick={handleUpdatePassword}>Save</button>
                </div>
            </form>
        </div>
    </>
}