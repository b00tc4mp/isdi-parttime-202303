export default function Profile({ onExitProfileClick, onGoToUpdateAvatarClick, onGoToUpdateEmailClick, onGoToUpdateUsernameClick, onGoToUpdatePasswordClick }) {
    const handleExitProfile = () => onExitProfileClick()
    
    const handleGoToUpdateAvatar = () => onGoToUpdateAvatarClick()

    const handleGoToUpdatEmail = () => onGoToUpdateEmailClick()

    const handleGoToUpdateUsername = () => onGoToUpdateUsernameClick()

    const handleGoToUpdatePassword = () => onGoToUpdatePasswordClick()

    return <div className="modal">
        <div className="home__profile page">
            <h2 className="text profile__user">Update your profile</h2>
            <button className="profile__anchor--avatar" href="" onClick={handleGoToUpdateAvatar}>Change avatar</button>
            <button className="profile__anchor--username" href="" onClick={handleGoToUpdateUsername}>Change username</button>
            <button className="profile__anchor--email" href="" onClick={handleGoToUpdatEmail}>Change email</button>
            <button className="profile__anchor--password" href="" onClick={handleGoToUpdatePassword}>Change password</button>
            <button className="profile__anchor--home" href="" onClick={handleExitProfile}>Back</button>
        </div>
    </div>
}