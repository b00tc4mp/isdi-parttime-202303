import { context } from "../ui"
import { updateUserPassword } from "../logic/users/updateUserPassword"

export default function UpdateUserPassword() {
    const userId = context.userId

    function handleUpdatePassword (event) {
        event.preventDefault()
        try {
            const currentPassword = event.target.parentElement.parentElement.querySelector('input.current-password')
            const newPassword = event.target.parentElement.parentElement.querySelector('input.new-password')
            const repeatPassword = event.target.parentElement.parentElement.querySelector('input.repeat-password')
            const buttons = event.target.parentElement.parentElement.querySelector('.buttons')
            currentPassword && newPassword  && repeatPassword && updateUserPassword(userId, currentPassword, newPassword, repeatPassword)
            currentPassword.setAttribute('disabled', '')
            newPassword.setAttribute('disabled', '')
            repeatPassword.setAttribute('disabled', '')
            event.target.parentElement.parentElement.reset()
            buttons.classList.add('off')
        } catch(error) {
            console.log(error.stack)
        }
    }
 
    function handleUpdatePasswordClick(event) {
        event.preventDefault()
        try {
            event.target.parentElement.querySelector('input.current-password').removeAttribute('disabled')
            event.target.parentElement.querySelector('input.new-password').removeAttribute('disabled')
            event.target.parentElement.querySelector('input.repeat-password').removeAttribute('disabled')
            event.target.parentElement.querySelector('.buttons').classList.remove('off')
        } catch(error) {
            console.log(error.message)
        }
    }
    function handleCancelUpdatePassword(event) {
        event.preventDefault()
        try {
            event.target.parentElement.querySelector('input.current-password').setAttribute('disabled', '')
            event.target.parentElement.querySelector('input.new-password').setAttribute('disabled', '')
            event.target.parentElement.querySelector('input.repeat-password').setAttribute('disabled', '')
            event.target.parentElement.querySelector('.buttons').classList.add('off')
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
                    <input className="current-password" type="password" defaultValue="" name="password" disabled />
                    <i className="uil uil-eye"></i>
                </div>
                <label htmlFor="">New password</label>
                <div className="password new-password">
                    <input className="new-password" type="password" defaultValue="" name="password" disabled />
                    <i className="uil uil-eye"></i>
                </div>
                <label htmlFor="">Repeat password</label>
                <div className="password repeat-password">
                    <input className="repeat-password" type="password" defaultValue="" name="password" autoComplete="off" disabled />
                    <i className="uil uil-eye"></i>
                </div>
                <div className="buttons off">
                    <button className="button--update-info__cancel-password" type="cancel" onClick={handleCancelUpdatePassword}>Cancel</button>
                    <button className="button--update-info__save-password" onClick={handleUpdatePassword}>Save</button>
                </div>
            </form>
        </div>
    </>
}