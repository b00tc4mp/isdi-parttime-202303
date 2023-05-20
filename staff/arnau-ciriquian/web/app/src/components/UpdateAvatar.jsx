import { updateUserAvatar } from "../logic/updateUserAvatar"
import { context } from "../ui"

export default function UpdateAvatar({ onUpdateUserAvatarClick, onCancelProfileUpdate }) {
    const handleUpdateUserAvatar = event => {
        event.preventDefault()
        const avatar = event.target.newAvatar.value

        try {
            updateUserAvatar(context.userId, avatar, error => {
                if (error) {
                    alert(error.message)

                    return
                }

                onUpdateUserAvatarClick()
            })
        } catch (error) {
            alert(error.message)
        }
    }

    const handleCancelProfileUpdate = () => onCancelProfileUpdate()

    return <div className="modal">
        <div className="home__avatar page">
            <h1 className="text">Change avatar</h1>
            <form className="avatar__form" onSubmit={handleUpdateUserAvatar}>
                <div className="inputs__box">
                    <input className="form__input" type="text" name="newAvatar" placeholder="new avatar url" />
                </div>
                {/* <div className="predefined-avatars">
                    <img className="predefined-avatar alien" src="./images/alien.svg"/>
                    <img className="predefined-avatar space-dog" src="./images/space-dog.svg"/>
                    <img className="predefined-avatar meteorite" src="./images/meteorite.svg"/>
                    <img className="predefined-avatar galaxy" src="./images/galaxy.svg"/>
                </div> */}
                <button className="form__button" type="submit">Change avatar</button>
            </form>
            <button className="avatar__anchor--profile" href="" onClick={handleCancelProfileUpdate}>Profile</button>
        </div>
    </div>
}