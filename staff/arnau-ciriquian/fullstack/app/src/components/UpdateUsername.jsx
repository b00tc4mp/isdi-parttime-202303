import { updateUsername } from "../logic/updateUsername"
import { context } from "../ui"

export default function UpdateUsername({ onUpdateUsernameClick, onCancelProfileUpdate }) {
    const handleUpdateUsername = event => {
        event.preventDefault()

        const oldUsername = event.target.oldUsername.value
        const newUsername = event.target.newUsername.value
        const password = event.target.password.value

        try {
            updateUsername(context.token, oldUsername, newUsername, password)
                .then(() => {
                    alert('name updated')

                    onUpdateUsernameClick()
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    const handleCancelProfileUpdate = () => onCancelProfileUpdate()

    return <div className="modal">
        <div className="home__username page">
            <h1 className="text">Change username</h1>
            <form className="username__form" onSubmit={handleUpdateUsername}>
                <div className="inputs__box">
                    <input className="form__input" type="text" name="oldUsername" placeholder="old username" />
                    <input className="form__input" type="text" name="newUsername" placeholder="new username" />

                    <div className="password-container">
                        <input className="form__input username__password" type="password" name="password" placeholder="password" />
                        <i className="username-eye fa-solid fa-eye"></i>
                    </div>
                </div>
                <button className="form__button" type="submit">Change username</button>
            </form>
            <button className="username__anchor--profile" href="" onClick={handleCancelProfileUpdate}>Profile</button>
        </div>
    </div>
}