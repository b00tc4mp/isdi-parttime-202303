import PropTypes from 'prop-types'
import { changePassword } from '../logic/updateUserPassword'
import { context } from '../ui'

export default function ChangePassword({onCancel, onPasswordChanged}) {
    ChangePassword.propTypes = {
        onCancel: PropTypes.func,
        onPasswordChanged: PropTypes.func
    }

    const handleCancelChangePassword = () => onCancel()

    const handleChangePassword = (event) => {
        event.preventDefault()

        const previousPassword = event.target['previous-password'].value
        const newPassword = event.target['new-password'].value
        const repeatNewPassword = event.target['repeat-new-password'].value

        try{
            changePassword(context.userId, previousPassword, newPassword, repeatNewPassword, error => {
                if(error){
                    alert(error.message)

                    return
                }

                onPasswordChanged()
            })
        } catch(error){
            alert(error.message)
        }
    }

    return <section className="modal-window" name="modal-change-password">
        <div className="updating-menus">
            <div className="red-text"></div>
            <form className="inputs" onSubmit={handleChangePassword}>
                <input className="input-field changing-inputs previous-password" type="password" name="previous-password" placeholder="Previous password"/>
                <input className="input-field changing-inputs new-password" type="password" name="new-password" placeholder="New password"/>
                <input className="input-field changing-inputs repeat-new-password" type="password" name="repeat-new-password" placeholder="Repeat New Password"/>
                <div>
                    <button className="submit-buttons change-my-password" name="change-my-password" type="submit">Save</button>
                    <button className="submit-buttons cancel-password-change" type="button" onClick={handleCancelChangePassword}>Cancel</button>
                </div>
            </form>
        </div>
    </section>
}