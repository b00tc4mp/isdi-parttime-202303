import { updateUserPassword } from "../logic/updateUserPassword"
import { context } from "../ui"

export default function UpdatePassword({ onUpdatePasswordClick, onCancelProfileUpdate }) {
    const handleUpdatePassword = event => {
        event.preventDefault()

        const oldPassword = event.target.oldPassword.value
        const newPassword = event.target.newPassword.value
        const confirmedPassword = event.target.newPasswordConfirmation.value

        try {
            updateUserPassword(context.userId, oldPassword, newPassword, confirmedPassword, error => {
                if (error) {
                    alert(error.message)

                    return
                }
                alert('password updated')

                onUpdatePasswordClick()
            })
        } catch (error) {
            alert(error.message)
        }
    }

    const handleCancelProfileUpdate = () => onCancelProfileUpdate()

    return <div className="modal">
        <div className="home__password page">
            <h1 className="text">Change password</h1>
            <form className="password__form" onSubmit={handleUpdatePassword}>
                <div className="inputs__box">

                    <div className="password-container">
                        <input className="form__input old__password" type="password" name="oldPassword" placeholder="old password" />
                        <i className="old-eye fa-solid fa-eye"></i>
                    </div>
                    <div className="password-container">
                        <input className="form__input new__password" type="password" name="newPassword" placeholder="new password" />
                        <i className="new-eye fa-solid fa-eye"></i>
                    </div>
                    <div className="password-container">
                        <input className="form__input new__password--confirm" type="password" name="newPasswordConfirmation" placeholder="new password confirmation" />
                        <i className="new-confirm-eye fa-solid fa-eye"></i>
                    </div>
                </div>
                <button className="form__button" type="submit">Change password</button>
            </form>
            <button className="password__anchor--profile" href="" onClick={handleCancelProfileUpdate}>Profile</button>
        </div>
    </div>
}