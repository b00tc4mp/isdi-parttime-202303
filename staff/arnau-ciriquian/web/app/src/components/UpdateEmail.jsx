import { updateUserEmail } from "../logic/updateUserEmail"
import { context } from "../ui"

export default function UpdateEmail({ onUpdateUserEmailClick, onCancelProfileUpdate }) {
    const handleUpdateUserEmail = event => {
        event.preventDefault()

        const oldEmail = event.target.oldEmail.value
        const newEmail = event.target.newEmail.value
        const confirmedEmail = event.target.newEmailConfirmation.value
        const password = event.target.emailPassword.value

        try {
            updateUserEmail(context.userId, oldEmail, newEmail, confirmedEmail, password, error => {
                if (error) {
                    alert(error.message)

                    return
                }
                alert('email updated')

                onUpdateUserEmailClick()
            })
        } catch (error) {
            alert(error.message)
        }
    }

    const handleCancelProfileUpdate = () => onCancelProfileUpdate()

    return <div className="modal">
        <h1 className="text">Change email</h1>
        <form className="email__form" onSubmit={handleUpdateUserEmail}>
            <div className="inputs__box">
                <input className="form__input" type="email" name="oldEmail" placeholder="old email" />
                <input className="form__input" type="email" name="newEmail" placeholder="new email" />
                <input className="form__input" type="email" name="newEmailConfirmation" placeholder="new email confirmation" />
                <div className="password-container">
                    <input className="form__input email__password" type="password" name="emailPassword" placeholder="password" />
                    <i className="email-eye fa-solid fa-eye"></i>
                </div>
            </div>
            <button className="form__button" type="submit">Change email</button>
        </form>
        <button className="email__anchor--profile" href="" onClick={handleCancelProfileUpdate}>Profile</button>
    </div>
}