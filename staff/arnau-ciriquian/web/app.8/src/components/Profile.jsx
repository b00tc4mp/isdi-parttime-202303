export default function Profile({ onExitProfileClick, onGoToUpdateAvatarClick }) {
    function handleExitProfile() {
        onExitProfileClick()
    }

    function handleGoToUpdateAvatar() {
        onGoToUpdateAvatarClick()
    }

    return <div className="modal">
        <div className="home__profile page">
            <h2 className="text profile__user">Update your profile</h2>
            <button className="profile__anchor--avatar" href="" onClick={handleGoToUpdateAvatar}>Change avatar</button>
            <button className="profile__anchor--username" href="">Change username</button>
            <button className="profile__anchor--email" href="">Change email</button>
            <button className="profile__anchor--password" href="">Change password</button>
            <button className="profile__anchor--home" href="" onClick={handleExitProfile}>Back</button>
        </div>
    </div>
}